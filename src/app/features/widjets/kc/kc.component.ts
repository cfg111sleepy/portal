import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
@Component({
  selector: '[app-kc]',
  templateUrl: './kc.component.svg',
  styleUrls: ['./kc.component.scss']
})
export class KcComponent implements OnInit {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();  
  @Input() x = 100;
  @Input() y = 100;
  @Input() k = 1;
  
  @Input() par1 = ".1";
  @Input() par2 = ".2";
  @Input() par3 = ".505";

  value = "---";
  p1 = "---";
  p2 = "---";
  p3 = "---";

  constructor() {

  }

  ngOnInit(): void {
  
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      
      let p1values = this.data.get(this.key+this.par1);
      let p2values = this.data.get(this.key+this.par2);
      let p505values = this.data.get(this.key+this.par3);
      
      let v1 = p1values?.filter(v=>v.value !== undefined).map(v=> v.value*this.k);
      let v2 = p2values?.filter(v=>v.value !== undefined).map(v=> v.value*this.k);
      let v505 = p505values?.filter(v=>v.value !== undefined).map(v=> v.value*this.k);

      if (v1 && v1.length > 0) {
        this.p1 = v1[v1.length-1].toFixed(1);
      }
      if (v2 && v2.length > 0) {
        this.p2 = v2[v2.length-1].toFixed(1);
      }
      if (v505 && v505.length > 0) {
        this.p3 = v505[v505.length-1].toFixed(0);
      }

      this.value = this.p1 + " * " + this.p2;
      
      //optional parameter
      if (this.par3) {
        this.value +=  " * " + this.p3;
      }
    }
  }
  
  onClick() {

  }

}
