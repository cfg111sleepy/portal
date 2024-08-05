import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../../state/season-inj.actions';
import * as actions1 from '../../../state/opdata.actions';

import * as selectors from '../../../state/season-inj.selectors';
import * as opDataSelectors from '../../../state/opdata.selectors';

import { SeasonInject } from '../season.models';

import * as act_actions from '../../../state/act-gas-season.actions';
import * as act_selectors from '../../../state/act-gas-season.selectors';
import { ActGasSeason } from 'src/app/models/season-act-gas';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

interface ActGasSeason1 {
  object: number;
  state: string;
  value: number;
  act_gas?: number;
  start: Date;
  end?: Date;
  change?: number;
  act_end?: number;
}

@Component({
  selector: 'app-season-inject-stat-table',
  templateUrl: './season-inject-stat-table.component.html',
  styleUrls: ['./season-inject-stat-table.component.scss']
})
export class SeasonInjectStatTableComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  selectedYear = new Date().getFullYear().toFixed(0);
  seasons$ = this.store.select(selectors.selectSeasons);
  seasons: SeasonInject[] = [];

  seasons1$ = this.store.select(act_selectors.selectCurrSeasonRows);
  seasons1: ActGasSeason[] = [];

  seasons2: ActGasSeason1[] = [];

  constructor(private store: Store, private calendar: NgbCalendar) { }

  sub1 = this.seasons$.subscribe(arr=> {
    this.seasons = arr;  
  });

  sub2 = this.seasons1$.subscribe(s=>{
    let temp = [...s];
    temp.reverse();
    this.seasons2 = this.convert(temp);
  });
  
  sub3 = this.dataMap$.subscribe(s=>{
    this.dataMap = s;
    console.log(s)
  });

  ngOnInit(): void {
    let today = this.calendar.getToday();    
    let from = new Date(today.year, today.month-1, today.day, 7,0,0,0);
    let to = new Date(today.year, today.month-1, today.day, 7,0,0,0);
    from.setDate(to.getDate() - 3);
    to.setDate(to.getDate() - 1);
    
    this.store.dispatch(actions1.loadTable({objects:[7000001], parameters:[452], from: from.toISOString(), to: to.toISOString()}));    

    this.store.dispatch(actions.getSeasonsForYear({year: +this.selectedYear}));
    this.store.dispatch(act_actions.getSeasonsForPsg( { object : 7000001}));
    
  }

  yearChanged(e: Event) {
    this.store.dispatch(actions.getSeasonsForYear({year: +this.selectedYear}));
  }
  
  getValueF(object:number, field:string, fixed:number): string {
    let val : number = this.getValue(object, field);
    if (val) {
      return val.toLocaleString("fr-CA", {minimumFractionDigits: fixed, maximumFractionDigits: fixed});
    } else {
      return "";
    }      
  }

  getValueD(object:number, field:string): string {
    
    let val = new Date(this.getValue(object, field));

    if (val && !isNaN(val.getTime()) && val.getTime() > 0) {  
        return val.toLocaleDateString();     
    } else {
      return "";
    }      
  }

  getValue(object:number, field:string): any {
    if (this.seasons && this.seasons.length > 0) {
      let season = this.seasons.find(s=> s.object == object);
      return Object(season)[field];
    } else {
      return null;
    }
  }

  
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  convert(data: ActGasSeason[]): ActGasSeason1[] {
    let res: ActGasSeason1[];
    res = data.map(e=>{ return {...e} });

    let values = this.dataMap.get("7000001.452");
    let currentActGas;

    if (values && values.length > 0) {
      currentActGas = values[values.length-1];
    }

    for (let i = res.length - 1; i > 0 ; i--) {
      const cur = res[i-1];
      const next = res[i];
      next.change = cur.change;
      next.act_end = cur.act_gas;
      next.end = new Date(new Date(cur.start).getTime() - 24*60*60*1000);
      cur.change = undefined;
      cur.act_end = undefined;
    }

    if (currentActGas && res[0] && res[0].act_gas){
      res[0].end = currentActGas.time_stamp;
      res[0].act_end = currentActGas.value;
      res[0].change = currentActGas.value - res[0].act_gas;  
    }

    return res;
  }   

}
