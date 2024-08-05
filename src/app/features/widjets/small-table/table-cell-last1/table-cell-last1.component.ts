import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

const datepipe: DatePipe = new DatePipe('en-US')

@Component({
  selector: '[app-table-cell-last1]',
  templateUrl: './table-cell-last1.component.html',
  styleUrls: ['./table-cell-last1.component.scss']
})
export class TableCellLast1Component implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() text = "";
  @Input() fixed = 1;  
  @Input() k = 1;  
  @Input() field = "value";
  @Input() dt = ""; //iso selected date
  @Input() offset = 0;

  value = "---";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        let nextDay = new Date(this.dt);
        nextDay.setDate(nextDay.getDate()+1);
        nextDay.setHours(7);
        nextDay.setMinutes(0);
        nextDay.setSeconds(0);
        let v1 = values?.filter(v=>v.value != undefined && new Date(v.time_stamp).getTime() < (nextDay.getTime() + this.offset*60*60*24*1000) );

        if (v1 && v1.length > 0) {

          let curr = v1[v1.length-1];
           
          if(curr && curr.value !== undefined) {
            let result = Number(this.k * curr.value);
            if (this.field == "value") {
              this.value = result.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed, maximumFractionDigits: this.fixed}) //            
            } else if (this.field == "time_stamp") {
              let formattedDate = datepipe.transform(curr.time_stamp, 'dd-MM-YYYY HH:mm')
              this.value = "" + formattedDate; 
            } else {
              this.value = curr.state;
            }           
          } else {
            this.value = "---"; 
          }
       
        }
        else {
          this.value = "---"; 
        }

      }
    }
  }


  
}
