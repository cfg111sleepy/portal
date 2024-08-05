import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: '[app-psg-svg-widjet]',
  templateUrl: './psg-svg-widjet.component.svg',
  styleUrls: ['./psg-svg-widjet.component.scss']
})
export class PsgSvgWidjetComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 120;
  @Input() h = 30;
  @Input() min = 0;
  @Input() max = 100;

  @Input() fillColor = 'rgb(199, 209, 216)';
  @Input() progressColor = 'rgb(180, 218, 137)';

  @Input() eu = "млн.м3";

  @Input() fixed = 3;  
  @Input() k = 0.001;

  @Input() displayTotal = false;
  @Input() dt = "";
  
  @Output() click = new EventEmitter<string>();
  @Output() clickTrend = new EventEmitter<string>();

  value = "---";
  delta = "---";
  delta_per = "--";
  fillDelta = "green";
  scaledValue = 0;
  scaledValue1 = 0;
  percentValue =0;

  maxDisp = "";

  aktKey = ".452";
  texAktKey = ".52";
  longKey = ".352";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data || changes["displayTotal"]) {
      let values = this.data.get(`${this.key+this.aktKey}`);
      let activeValues = this.data.get(`${this.key+this.texAktKey}`)
      let longValues = this.data.get(`${this.key+this.longKey}`)

      if (values && values.length > 1 && activeValues) {
        
        let times = this.selectPrevNextTimeStampes(this.dt);
        
        let long = longValues?.find(v=> v.time_stamp.toString() == times[1]);

        let curr;
        let prev;

        if(this.displayTotal) {
          curr = values.find(v=> v.time_stamp.toString() == times[1]);
          prev = values.find(v=> v.time_stamp.toString() == times[0]);
        } else {
          curr = activeValues.find(v=> v.time_stamp.toString() == times[1]);
          prev = activeValues.find(v=> v.time_stamp.toString() == times[0]);
        }

        if (curr && prev) {
          let currVal = curr.value *this.k;
          let prevVal = prev.value *this.k;
  
          this.value = currVal.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
          let dv = currVal - prevVal;
          let dv_pers = dv / this.max *100;

          this.fillDelta = dv < 0 ? "rgb(234,104,76)" : "grb(180,218,137)";
          let sdv = dv.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
          this.delta = dv < 0 ? sdv : "+"+sdv;
          this.delta_per = Math.abs(dv_pers).toLocaleString("fr-CA", {maximumFractionDigits: 2});
          
          this.scaledValue = this.linearRightXScaling(currVal);
          this.percentValue = Math.round( currVal*100 / this.max);   

          if(long && this.displayTotal) {
            this.scaledValue1 = this.linearRightXScaling(long.value*this.k);
          } else {
            this.scaledValue1 = this.linearRightXScaling(0);
            if(long?.value){
              this.percentValue = Math.round( currVal*100 / (this.max - long.value*this.k));
            }
          }
          
        } else {
          this.value = "---";
          this.delta = "---";
          this.delta_per = "--";
          this.scaledValue = 0; 
          this.percentValue = 0;
        }

      }  else {
        this.value = "---";
        this.delta = "---";
        this.delta_per = "--";
        this.scaledValue = 0; 
        this.percentValue = 0;
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
    //console.log(d0.toISOString(), d1.toISOString(), d2.toISOString())
    return [d0.toISOString(), d1.toISOString(), d2.toISOString()];
  }

  ngOnInit(): void {
    this.maxDisp = this.max.toLocaleString("fr-CA");
  }
  
  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit(this.key);
  }
  
  onClickTrend(event: Event) {
    event.stopPropagation();
    this.clickTrend.emit(this.key+this.aktKey);
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
