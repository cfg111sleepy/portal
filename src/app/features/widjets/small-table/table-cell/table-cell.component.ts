import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 3;  
  @Input() k = 1;
  @Input() b = 0;
  @Input() dt = "";
  
  value = "---";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);

        let curr = values.find(v=> v.time_stamp.toString() == times[this.offset+1]);
        if(curr && curr.value != undefined) {
          let result = this.k * curr.value + this.b;
          this.value = result.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed}) //
        } else {
          this.value = "---"; 
        }
     
      }
      else {
        this.value = "---"; 
      }
    }
  }

  selectPrevNextTimeStampes(dtIso:string) :string[] {

    //console.log(dtIso);
    let d1 = new Date(dtIso);
    d1.setHours(7);
    let d0 = new Date(dtIso);
    d0.setHours(7);
    d0.setDate(d0.getDate()-1);
    let d2 = new Date(dtIso);
    d2.setHours(7);
    d2.setDate(d2.getDate()+1);
    return [d0.toISOString(), d1.toISOString(), d2.toISOString()];
  }

  
}
