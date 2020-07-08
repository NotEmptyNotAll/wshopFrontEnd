import {Component, OnInit} from '@angular/core';
import {Month} from './month';
import {MONTHS} from './mock-months';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'select months';
  search = ''
  months = MONTHS

  constructor() {
  }

  ngOnInit() {
  }

  clear(): void {
    this.search = ''
    this.months = MONTHS
    this.title = 'select months';
  }

  onSearch(search: string): void {
    this.months = MONTHS.filter(item => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || item.id.toString().indexOf(search) > -1
    })
    if (this.months.length === 1)
      this.title = 'nice choice';
    else
      this.title = 'select months';

  }
}
