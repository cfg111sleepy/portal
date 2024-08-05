import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AgsiDayData, AgsiDayNumValues } from '../agsi-gie-eu.models';

@Component({
  selector: 'app-agsi-country',
  templateUrl: './agsi-country.component.html',
  styleUrls: ['./agsi-country.component.scss']
})
export class AgsiCountryComponent implements OnInit {
  constructor() { }

  METER_TO_WT = 10.56;

  @Input() data? : AgsiDayData;
  @Input() dataLastY? : AgsiDayData;

  @Input() code = "eu";
  @Input() country = "EU";
  @Input() title = "Title";
  @Input() displayMeters = false;
  
  @Output() countryClick: EventEmitter<string> = new EventEmitter();

  agsi? : AgsiDayData;
  agsiLastY? : AgsiDayData;

  agsiValues? : AgsiDayNumValues;
  agsiValuesLastY? : AgsiDayNumValues;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
     console.log(this.data)
      let data = this.findInAgsiTree(this.data, this.code);

      this.agsi = data;
      this.agsiValues = this.convert(data);

    }
    
    if (changes["displayMeters"]) {
      this.agsiValues = this.convert(this.agsi);
      this.agsiValuesLastY = this.convert(this.agsiLastY);
    }

    if (changes["dataLastY"] && this.dataLastY ) {
      //console.log(this.data)
       let data = this.findInAgsiTree(this.dataLastY, this.code);
 
       this.agsiLastY = data;
       this.agsiValuesLastY = this.convert(data);
 
     }
   }


  ngOnInit(): void {
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

  convert(agsi? : AgsiDayData) {
    let res;
    if(agsi) {
      if (this.displayMeters) {
        let gasInStorage = Number(agsi.gasInStorage) / this.METER_TO_WT;
        let workingGasVolume = Number(agsi.workingGasVolume) / this.METER_TO_WT;
        let injection = Number(agsi.injection) / this.METER_TO_WT;
        let withdrawal = Number(agsi.withdrawal) / this.METER_TO_WT;
        let injectionWithdraw = injection - withdrawal;
        let trend = Number(agsi.trend);
        let full = Number(agsi.full);

        res = {
            gasDayStart: new Date(agsi.gasDayStart).toLocaleDateString(),
            gasInStorage: gasInStorage.toFixed(1),
            injection: injection.toFixed(1),
            withdrawal: withdrawal.toFixed(1),
            workingGasVolume: workingGasVolume.toFixed(1),
            injectionWithdraw: injectionWithdraw > 0 ? "+"+ injectionWithdraw.toFixed(1): injectionWithdraw.toFixed(1),
            trend: trend >0 ? "+"+ trend.toFixed(1) : trend.toFixed(1),
            style: "width: "+full.toFixed(0)+"%",
            full: full.toFixed(0),
            wo_style: injectionWithdraw >= 0 ? "zakachka-value" : "otbor-value"
          }
      } else {
        let gasInStorage = Number(agsi.gasInStorage);
        let workingGasVolume = Number(agsi.workingGasVolume);
        let injection = Number(agsi.injection);
        let withdrawal = Number(agsi.withdrawal);
        let injectionWithdraw = injection - withdrawal;
        let trend = Number(agsi.trend);
        let full = Number(agsi.full);

        res = {
            gasDayStart: new Date(agsi.gasDayStart).toLocaleDateString(),
            gasInStorage: gasInStorage.toFixed(1),
            injection: injection.toFixed(1),
            withdrawal: withdrawal.toFixed(1),
            workingGasVolume: workingGasVolume.toFixed(1),
            injectionWithdraw: injectionWithdraw > 0 ? "+"+ injectionWithdraw.toFixed(1): injectionWithdraw.toFixed(1),
            trend: trend >0 ? "+"+ trend.toFixed(1) : trend.toFixed(1),
            style: "width: "+full.toFixed(0)+"%",
            full: full.toFixed(0),
            wo_style: injectionWithdraw >= 0 ? "zakachka-value" : "otbor-value"
          }
      }
    }
    return res;    
  }

  onClick() {
    this.countryClick.emit(this.code);
  }

}
