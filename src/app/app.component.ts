import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {Subject} from 'rxjs';

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
        if (results) {
          this.searchResults = results;
        }

      }
    );
  }

  searchFlickr(event) {
    const value = event.target.value.trim();
    if (value.length > 0) {
      this.searchTerm.next(value);
    } else {
      if (this.searchResults !== undefined) {
        this.searchResults.length = 0;
      }

    }

  }
}
