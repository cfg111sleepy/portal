import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-svg-winjet1]',
  templateUrl: './svg-winjet1.component.svg',
  styleUrls: ['./svg-winjet1.component.scss']
})
export class SvgWinjet1Component implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 100;
  @Input() h = 30;  
  @Input() fillColor = 'rgb(255, 255, 255)';
  @Input() eu = "тис.м3";
  value = "---";
  delta = "---";
  fillDelta = "green";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 1) {
        this.value = values[0].value.toFixed(3);
        let delta = values[0].value - values[1].value;
        this.fillDelta = delta < 0 ? "red" : "green";
        this.delta = delta < 0 ? delta.toFixed(3) : "+"+ delta.toFixed(3);        
      }
      else {
        this.value = "---";
        this.delta = "---";  
      }
    }
  }


  ngOnInit(): void {

  }
  
  onClick() {

  }

}
