import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-table-cell3-offset]',
  templateUrl: './table-cell3-offset.component.html',
  styleUrls: ['./table-cell3-offset.component.scss']
})
export class TableCell3OffsetComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() dt = "";
  
  contrHour = 7;
  value = "---";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);

        let curr = values.find(v=> v.time_stamp.toString() == times[this.offset + 3]);
        if(curr && curr.value != undefined) {
          let result = this.k * curr.value;
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
    let d3 = new Date(dtIso);
    d3.setHours(this.contrHour);
    
    let d2 = new Date(dtIso);
    d2.setHours(this.contrHour);
    d2.setDate(d2.getDate()-1);

    let d1 = new Date(dtIso);
    d1.setHours(this.contrHour);
    d1.setDate(d1.getDate()-2);

    let d0 = new Date(dtIso);
    d0.setHours(this.contrHour);
    d0.setDate(d0.getDate()-3);

    let d4 = new Date(dtIso);
    d4.setHours(this.contrHour);
    d4.setDate(d4.getDate()+1);

    let d5 = new Date(dtIso);
    d5.setHours(this.contrHour);
    d5.setDate(d5.getDate()+2);

    return [d0.toISOString(), d1.toISOString(), d2.toISOString(), d3.toISOString(), d4.toISOString(), d5.toISOString()];
  }

  
}
