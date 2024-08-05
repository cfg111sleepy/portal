
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
@Component({
  selector: '[app-kc-cell-colored]',
  templateUrl: './kc-cell-colored.component.svg',
  styleUrls: ['./kc-cell-colored.component.scss']
})
export class KcCellColoredComponent implements OnInit, OnChanges {
  //синий RGB 0 89 168
  //зелены RGB 69 149 52
  //красный RGB 155 23 45

  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();  
  @Input() x = 100;
  @Input() y = 100;
  @Input() k = 1;
  @Input() fixed = 1;
  @Input() isDark = false;
  @Input() offset = 0;
  @Input() field = "value";
  @Input() dt = ""; //iso selected date

  @Output() click = new EventEmitter<string>();
  
  blueColor = 'rgb(0, 89, 168)';
  redColor = 'rgb(155, 23, 45)';
  greenColor = 'rgb(69, 149, 52)';

  fillColor = 'rgb(69, 149, 52)';

  value = "---";
  p1 = "---";

  constructor() {

  }

  ngOnInit(): void {
  
  }
  
  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit(this.key);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let nextDay = new Date(this.dt);
      nextDay.setDate(nextDay.getDate()+1);
      nextDay.setHours(7);
      nextDay.setMinutes(0);
      nextDay.setSeconds(0);

      let p1values = this.data.get(this.key);   

      let v1 = p1values?.filter(v=>v.value != undefined && new Date(v.time_stamp).getTime() < (nextDay.getTime() + this.offset*60*60*24*1000) );

      if (v1 && v1.length > 0) {
        
        let last = v1[v1.length -1];
        let previous = v1[v1.length -2];
        
        //console.log(this.key, this.dt, v1);

        if (this.field == "time_stamp") {
          this.value = new Date(last.time_stamp).toLocaleString();
          return;    
        }
        //text coloring
        let dv = last.value - previous.value;
        if (dv > 0) {
          this.fillColor = this.blueColor;
        } else if (dv < 0) {
          this.fillColor = this.redColor;
        } else {
          this.fillColor = this.greenColor;
        }
        
        this.value = last.value.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed, maximumFractionDigits: this.fixed}) //;

      } else {
        this.value = "---";
      }    
      
    }
  }
  

}

