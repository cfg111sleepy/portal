import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-psg-svg-widjet-fake]',
  templateUrl: './psg-svg-widjet-fake.component.svg',
  styleUrls: ['./psg-svg-widjet-fake.component.scss']
})
export class PsgSvgWidjetFakeComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 120;
  @Input() h = 30;
  @Input() min = 0;
  @Input() max = 100;

  @Input() fillColor = 'rgb(199, 209, 216)';
  @Input() progressColor = 'rgb(244,106,76)';

  @Input() eu = "млн.м3";

  @Input() fixed = 3;  
  @Input() k = 0.001;

  @Input() long = 0;
  @Input() dt = "";
  @Input() fakeValue = 175.863684;
  @Output() click = new EventEmitter<string>();

  value = "---";
  delta = "---";
  fillDelta = "green";
  scaledValue = 0;
  scaledValue1 = 0;
  percentValue =0;

  maxDisp = "";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
    this.maxDisp = this.max.toLocaleString("fr-CA");

    let currVal = this.fakeValue;
    let prevVal = this.fakeValue;

    this.value = currVal.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
    
    //let dv = currVal - prevVal;
    //this.fillDelta = dv < 0 ? "red" : "green";
    //let sdv = dv.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
    //this.delta = dv < 0 ? sdv : "+"+sdv;

    this.scaledValue = this.linearRightXScaling(currVal);
    this.percentValue = Math.floor( currVal*100 / this.max);
    this.scaledValue1 = this.linearRightXScaling(this.long*this.k);

  }
  
  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit(this.key);
  }

  //x- zero scale, x + width -full scale
  linearRightXScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.w)
  }

  linearBottomYScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.h)
  }  

  linearScale(value:number, min:number, max:number, zero:number, full:number): number {
    return zero + (value-min)*(full-zero)/(max-min);
  }

}
