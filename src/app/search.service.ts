import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';


@Injectable()
export class SearchService {

  flickrSearchUrl =  'https://api.flickr.com/services/feeds/photos_public.gne' ;

  constructor(private http: HttpClient) {}

  search(searchTerm: Observable<string>) {
    try {
      return searchTerm.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(
          term => this.searchFlikr(term)
        )
      );
    } catch (error) {
      console.log('> Error is handled: ', error.name);
    }
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
    return this.http.jsonp(this.searchUrl(searchTerm), 'jsoncallback').pipe(
      catchError( err => {
        this.handleError(err);
        return throwError(err) ;
      }),
      map(res  => {
        if ('items' in res) {
          return res['items'];
        }

      })
    );
  }
}
