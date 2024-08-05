import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AgsiDayData } from '../../dashboards/agsi-gie-eu/agsi-gie-eu.models';


@Component({
  selector: '[app-psg-svg-widjet-eu]',
  templateUrl: './psg-svg-widjet-eu.component.svg',
  styleUrls: ['./psg-svg-widjet-eu.component.scss']
})
export class PsgSvgWidjetEuComponent implements OnInit, OnChanges {

  METER_TO_WT = 0.01056;

  @Input() data? : AgsiDayData;
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 120;
  @Input() h = 30;
  @Input() code = "eu";
  min = 0;
  max = 100;

  @Input() fillColor = 'rgb(199, 209, 216)';
  @Input() progressColor = 'rgb(180, 218, 137)';

  @Input() eu = "ГВт";

  @Input() fixed = 3;  
  @Input() k = 1;

  @Input() displayTotal = false;
  @Input() dt = "";
  
  @Output() click = new EventEmitter<string>();

  value = "---";
  delta = "---";
  trend = "--";
  fillDelta = "green";
  scaledValue = 0;
  scaledValue1 = 0;
  percentValue =0;

  maxDisp = "";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
     //console.log(this.data)
      let data = this.findInAgsiTree(this.data, this.code);

        if (data ) {
          this.maxDisp = Number(data.workingGasVolume / this.METER_TO_WT).toLocaleString("fr-CA", {maximumFractionDigits: 0});
          this.value = Number(data.gasInStorage/ this.METER_TO_WT).toLocaleString("fr-CA", {maximumFractionDigits: this.fixed, minimumFractionDigits: this.fixed});
          this.max = Number(data.workingGasVolume/ this.METER_TO_WT);

          let dv = Number(data.injection) - Number(data.withdrawal);
          dv = dv/ this.METER_TO_WT / 1000; //GWh -> TWh
          this.fillDelta = dv < 0 ? "rgb(234,104,76)" : "grb(180,218,137)";
          let sdv = dv.toLocaleString("fr-CA", {maximumFractionDigits: 3, minimumFractionDigits: 3});
          this.delta = dv < 0 ? sdv : "+" + sdv;
  
          this.scaledValue = this.linearRightXScaling(Number(data.gasInStorage/ this.METER_TO_WT));          
          this.percentValue = Math.round(Number(data.full));   
          
          this.trend = data.trend;

        } else {
          this.value = "---";
          this.delta = "---";
          this.scaledValue = 0; 
          this.percentValue = 0;
        }


    }
  }


  ngOnInit(): void {
    this.maxDisp = this.max.toLocaleString("fr-CA");
  }
  
  onClick(event: Event) {
    event.stopPropagation();
    //this.click.emit(this.key);
  }

  //x- zero scale, x + width -full scale
  linearRightXScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.w)
  }

  linearBottomYScaling(value:number): number {
    return this.linearScale(value, this.min, this.max, 0, this.h)
  }  

  linearScale(value:number, min:number, max:number, zero:number, full:number): number {
    //console.log(value, min, max, zero, full)
    return zero + (value-min)*(full-zero)/(max-min);
  }

  findInAgsiTree(root : AgsiDayData, code:string): any {
    if (root.code == code) {
      return root;
    } 
    if (!root.children) {
      return undefined;
    }
    if (root.children) {
        for (let i = 0; i < root.children.length; i++) {
          const newRoot = root.children?.[i];
          let data = this.findInAgsiTree(newRoot, code);
          if (data) {
            return data;
          }
        }
    }       
  }

}

