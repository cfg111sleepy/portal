
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
@Component({
  selector: '[app-kc-cell]',
  templateUrl: './kc-cell.component.svg',
  styleUrls: ['./kc-cell.component.scss']
})
export class KcCellComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();  
  @Input() x = 100;
  @Input() y = 100;
  @Input() k = 1;
  @Input() fixed = 1;


  value = "---";
  p1 = "---";

  constructor() {

  }

  ngOnInit(): void {
  
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      
      let p1values = this.data.get(this.key);
      
      let v1 = p1values?.filter(v=>v.value !== undefined).map(v=> v.value*this.k);

      if (v1 && v1.length > 0) {
        this.p1 = v1[v1.length-1].toFixed(this.fixed);
      }

      this.value = this.p1;
      
    }
  }
  
  onClick() {

  }

}
