import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Value,StatValue } from '../../gas-storage-map/gas-storage-map.models';


@Component({
  selector: '[app-vtv-psg-days-table-row-compact]',
  templateUrl: './vtv-psg-days-table-row-compact.component.html',
  styleUrls: ['./vtv-psg-days-table-row-compact.component.scss']
})
export class VtvPsgDaysTableRowCompactComponent implements OnInit {
  
  @Input() key1 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() stat : Map<string, StatValue> =  new Map<string, StatValue>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() title = 'Q';


  tds: string[] = [];
  total: string ="";
  date: string ="";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values1 = this.data.get(this.key1);

      if (values1 && values1.length > 0) {
        let v1 = values1.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getDate()} });
        //console.log(v1)
        let sum = v1.reduce((a, b) => a + (isNaN(b.y) ? 0 :  b.y), 0);        

        for (let i = 2; i < 33; i++) {
          let cell = v1.find(v=> v.x == i-1);
          if (cell && cell.y) {
            this.tds[2] = cell.y.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
          }          
        }

        this.tds[1] = sum.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
      }
      else {
        this.tds = [];
      }
    }
    if (changes["stat"] && this.stat ) {
      let value = this.stat.get(this.key1);
      if (value) {
        this.tds[0] = value.sum.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
      }
    }
  }



}
