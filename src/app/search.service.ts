import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';


@Injectable()
export class SearchService {

  flickrSearchUrl =  'https://api.flickr.com/services/feeds/photos_public.gne' ;

  constructor(private http: HttpClient) {}

  search(searchTerm: Observable<string>) {
    return searchTerm.pipe(
      debounceTime(50),
      distinctUntilChanged(),
      switchMap(
        term => this.searchFlikr(term)
      )
    );
  }

  searchUrl(term) {
    const params = new HttpParams()
      .append('tags', encodeURIComponent(term))
      .append('format', 'json');
    return `${this.flickrSearchUrl}?${params.toString()}`;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    // return throwError(errorMessage);
  }

  searchFlikr(searchTerm: string) {
    // const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods':'GET, POST, DELETE, PUT',
    //   }),
    //   responseType: 'json'
    // };
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    // headers.append('Access-Control-Allow-Headers', 'content-type, accept');
    // // headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    //   , {
    //   headers : {
    //     'Access-Control-Allow-Origin': '*' ,
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT,OPTIONS',
    //   },
    //   responseType: 'text'
    // }
    return this.http.jsonp(this.searchUrl(searchTerm), 'jsoncallback').pipe(
      catchError(this.handleError),
      map(res  => {
        return res.items;
      })
    );
  }


}
