import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-flicker';
  searchTerm = new Subject<any>();

  searchResults: any[];

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm).subscribe(
      results => {
          this.searchResults = results;
      }
    );
  }

  searchFlikr(event) {
    const value = event.target.value;
    if (value.trim().length > 0) {
      this.searchTerm.next(value);
    } else {
      this.searchResults.length = 0;
    }

  }
}
