import { Component, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-progress-bar]',
  templateUrl: './progress-bar.component.svg',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() x = 0;
  @Input() y = 0;
  @Input() w = 100;
  @Input() h = 20;
  @Input() fillColor = 'rgb(125, 255, 128)';

  scaledValue = 0;

  constructor() { 

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        this.value = values[0].value;
        
      }
      else {
        this.value = 0;
 
      }
      //render progress
      this.linearRightXScaling();
    }
  }


  onClick():void {

  }

  //x- zero scale, x + width -full scale
  linearRightXScaling(): void {
    this.scaledValue = this.linearScale(this.value, this.min, this.max, 0, this.w)
  }

  linearBottomYScaling(): void {
    this.scaledValue = this.linearScale(this.value, this.min, this.max, 0, this.h)
  }  

  linearScale(value:number, min:number, max:number, zero:number, full:number): number {
    return zero + (value-min)*(full-zero)/(max-min);
  }
}
