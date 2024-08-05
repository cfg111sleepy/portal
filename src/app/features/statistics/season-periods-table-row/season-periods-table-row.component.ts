import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Stats } from '../season.models';

@Component({
  selector: '[app-season-periods-table-row]',
  templateUrl: './season-periods-table-row.component.html',
  styleUrls: ['./season-periods-table-row.component.scss']
})
export class SeasonPeriodsTableRowComponent implements OnInit, OnChanges {
  
  @Input() data?: Stats[] = [];

  begin : string = "";
  end : string = "";
  len : string = "";

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] ) {
      if (this.data) {
        let v = this.data[0];
        if (v) {
          this.begin = new Date(v.begin).toLocaleDateString();
          this.end = new Date(v.end).toLocaleDateString();
          this.len = v.count.toFixed(0);
          
        } else {
          this.begin = "";
          this.end = "";
          this.len = "";
        } 
      }
    }
  }
}
