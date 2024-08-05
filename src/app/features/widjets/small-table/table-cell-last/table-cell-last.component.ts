  import { DatePipe } from '@angular/common';
  import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
  import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

  const datepipe: DatePipe = new DatePipe('en-US')

  @Component({
    selector: '[app-table-cell-last]',
    templateUrl: './table-cell-last.component.html',
    styleUrls: ['./table-cell-last.component.scss']
  })
  export class TableCellLastComponent implements OnInit, OnChanges {
    @Input() key = "";
    @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    @Input() text = "";
    @Input() fixed = 1;  
    @Input() k = 1;  
    @Input() field = "value";

    value = "---";
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes["data"] && this.data ) {
        let values = this.data.get(`${this.key}`)

        if (values && values.length > 0) {
          values = values.filter(v=>v.value !== undefined)
        }

        if (values && values.length > 0) {
  
          let curr = values[values.length-1];
           
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
  