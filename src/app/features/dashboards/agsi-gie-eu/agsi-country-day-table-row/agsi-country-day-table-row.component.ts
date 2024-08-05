import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AgsiDayData } from '../agsi-gie-eu.models';

export interface AgsiDay {
  gasInStorage:       string;
  injection:          string;
  withdrawal:         string;
  workingGasVolume:   string;
  trend:              string;
  full:               string;
}

@Component({
  selector: '[app-agsi-country-day-table-row]',
  templateUrl: './agsi-country-day-table-row.component.html',
  styleUrls: ['./agsi-country-day-table-row.component.scss']
})
export class AgsiCountryDayTableRowComponent implements OnInit, OnChanges {
  
  constructor() { }

  @Input() data? : AgsiDayData;
  @Input() code = "eu";
  @Input() country = "EU";
  @Input() displayMeters = false;

  METER_TO_WT = 10.56;

  agsi? : AgsiDayData;
  agsiValues? : AgsiDay;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
     console.log(this.data)
      let data = this.findInAgsiTree(this.data, this.code);

      this.agsi = data;
      this.agsiValues = this.convert(this.agsi);
    }
    
    if (changes["displayMeters"]) {
      this.agsiValues = this.convert(this.agsi);
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
            gasInStorage: gasInStorage.toFixed(3),
            injection: injection.toFixed(3),
            withdrawal: withdrawal.toFixed(3),
            workingGasVolume: workingGasVolume.toFixed(3),
            injectionWithdraw: injectionWithdraw > 0 ? "+"+ injectionWithdraw.toFixed(1): injectionWithdraw.toFixed(1),
            trend: trend >0 ? "+"+ trend.toFixed(1) : trend.toFixed(1),
            full: full.toFixed(1),
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
            gasInStorage: gasInStorage.toFixed(3),
            injection: injection.toFixed(3),
            withdrawal: withdrawal.toFixed(3),
            workingGasVolume: workingGasVolume.toFixed(3),
            injectionWithdraw: injectionWithdraw > 0 ? "+"+ injectionWithdraw.toFixed(1): injectionWithdraw.toFixed(1),
            trend: trend >0 ? "+"+ trend.toFixed(1) : trend.toFixed(1),
            full: full.toFixed(1),
          }
      }
    }
    return res;    
  }

}
