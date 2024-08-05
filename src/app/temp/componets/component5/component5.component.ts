
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../../state/opdata.actions';
import * as actions1 from '../../../state/http-comms.actions';

import * as opDataSelectors from '../../../state/opdata.selectors';
import * as selectors from '../../../state/http-comms.selectors'

import { Value } from '../../../features/dashboards/gas-storage-map/gas-storage-map.models';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LineModel, PointModel } from 'src/app/features/charting/day-add-xlines-chart-component/day-add-xlines-chart-component.component';
import { ForecastRow } from 'src/app/models/http';

@Component({
  selector: 'app-component5',
  templateUrl: './component5.component.html',
  styleUrls: ['./component5.component.scss']
})
export class Component5Component implements OnInit, OnDestroy {
  constructor(private store: Store, private calendar: NgbCalendar) {   
  }

  consume_title:string = `Споживання за добу, тис м\u00B3`;
  t_title:string = `Т повітря середня, \u2103`;

  title:string = `Споживання за добу, тис м\u00B3, загалом`;
  title1:string = `Т повітря середня, \u2103, загалом`;
  

  deletingTime? :number; 

  vydob_2 = 0;

  k = 1;
  obj = 9900405;
  obj_w = 25;
  par = 8;

  selectedDay: NgbDateStruct = {
    year:2023,
    month:1,
    day:1
  };
  
  currentDay?: Date;
  yesterdayDay?: Date;
  day_2?: Date;

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);

  lines: LineModel[] = [];
  lines1: LineModel[] = [];

  lineMap: Map<string, LineModel> =  new Map<string, LineModel>();
  lineMap1: Map<string, LineModel> =  new Map<string, LineModel>();//wheTHER

//-------------------------------------------

KEY = "9900405.8";
CONTRACT_HOUR: number = 8;
currentGasDay: Date = new Date("2023-01-01T07:00:00");
gasDay_1: Date = new Date("2023-01-01T07:00:00");
gasDay_2: Date = new Date("2023-01-01T07:00:00");
gasDay_3: Date = new Date("2023-01-01T07:00:00");
gasDay_7: Date = new Date("2023-01-01T07:00:00");

flowForecastdataMap$ = this.store.select(selectors.selectFlowForecastMap);
flowForecastdataMap : Map<string, Value[]> =  new Map<string, Value[]>();
rows: ForecastRow[] = [];
totals?: ForecastRow;
totals1?: ForecastRow;

table1$ = this.store.select(selectors.selectTable1);

consumeTemperatureMap : Map<string, Value[]> =  new Map<string, Value[]>();
consumeTemperatureMap$ = this.store.select(selectors.selectConsumeTemperatureMap);

//-------------------------------------------
diffMap$ = this.store.select(selectors.selectConsumeDiffsMap);
diffMap : Map<string, Value[]> =  new Map<string, Value[]>();
diffAverage: number = 0;

  sub1 = this.dataMap$.subscribe(map=> {
    //console.log(this.diffAverage);


    if (map.size > 0) {
      let line = this.convertToLine(this.ObjectParToKey(this.obj, this.par), map);
      let line1 = this.convertToLine(this.ObjectParToKey( this.obj_w, 4), map);     //wheather

      if (line.label) {
        this.lineMap.set(line.label, line);
      
        //console.log(line.label)
        
        this.lines = Array.from(this.lineMap.values());    
      }

      if (line1.label) {
        this.lineMap1.set(line1.label, line1);
      
        //console.log(this.lineMap)
        
        this.lines1 = Array.from(this.lineMap1.values());    
      }

    }

  });

  sub2 = this.flowForecastdataMap$.subscribe(map=> {
    //console.log(this.diffAverage);
    this.flowForecastdataMap = map;
    let r = this.fkconvertToLine( this.KEY, map);
    this.rows = r;

    this.calc1(this.rows);
    this.calc2(this.rows);
    this.totals = this.calc3(this.rows);
    this.totals1 = this.calc4(this.totals);    

    //this.store.dispatch(actions.SetFloForecastTotalsRow({payload : this.totals}));
    //console.log(this.diffAverage);
    //this.consumeTemperatureMap = this.calcTodayYesterday(this._consumeTemperatureMap);
  });

  sub3 = this.diffMap$.subscribe(map=> {
    //console.log(this.diffAverage);
    let values = map.get("9900419.63");
    if (values && values.length > 0) {
      let summ =0;
      let count =0;
      values.forEach(v => {
        if (v.value) {
          summ = summ + v.value;
          count ++;
        }        
      });
      this.diffAverage = summ / count;
      //console.log(this.diffAverage);
    }
  });

  //внимание ! добавлен костыль
  sub4 = this.consumeTemperatureMap$.subscribe(map=> {
    //console.log(map)

    let timer: ReturnType<typeof setTimeout> = setTimeout(() => { 
      this.consumeTemperatureMap = this.calcTodayYesterday(map);
     }, 500);

  });

  sub5 = this.table1$.subscribe(map=> {
    //console.log(map)
    if (map.size > 0) {
      let line = this.convertToLine(this.ObjectParToKey(this.obj, this.par), map);
      let line1 = this.convertToLine(this.ObjectParToKey( this.obj_w, 4), map);     //wheather
      if (line.label) {
        this.lineMap.set(line.label, line);     
        this.lines = Array.from(this.lineMap.values());    
      }
      if (line1.label) {
        this.lineMap1.set(line1.label, line1);      
        //console.log(this.lineMap)        
        this.lines1 = Array.from(this.lineMap1.values());    
      }

    }
  });

  ngOnInit(): void {
    let today = this.calendar.getToday();
    this.selectedDay = today;

    this.currentDay = new Date();
    this.currentDay.setTime(this.currentDay.getTime()- 5*60*60*1000);

    this.yesterdayDay = new Date(this.currentDay);
    this.yesterdayDay.setTime(this.yesterdayDay.getTime() - 24*60*60*1000);

    this.day_2 = new Date(this.currentDay);
    this.day_2.setTime(this.day_2.getTime() - 48*60*60*1000);
    
    this.clickSelectDay(this.calendar.getPrev(today, 'd', 2));

    let timer1: ReturnType<typeof setTimeout> = setTimeout(() => { 
      this.clickSelectDay(this.calendar.getPrev(today, 'd', 1));
    }, 200);

    let timer2: ReturnType<typeof setTimeout> = setTimeout(() => { 
      this.clickSelectDay(today);  
    }, 400);  


    this.fkOnInit();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }
	
  clickSelectDay(d: NgbDate): void {
		//console.log("Date selection changed ", date)
    let from = new Date(d.year, d.month-1, d.day, 0,0,0,0);
    let to = new Date(d.year, d.month-1, d.day, 0,0,0,0);
    to.setDate(to.getDate()+1);

    let from8 = new Date(d.year, d.month-1, d.day, 8,0,0,0);
    let to8 = new Date(d.year, d.month-1, d.day, 8,0,0,0);
    to8.setDate(to8.getDate()+1);
    
    this.store.dispatch(actions.loadTable({objects:[this.obj, this.obj_w], parameters:[this.par,4], from: from8.toISOString(), to: to8.toISOString()}));    
    this.store.dispatch(actions1.loadConsumeTemperatureTable({objects:[9900241, 9900420, 9900419, 25, 9900242, 9900294], parameters:[3, 63], from: from.toISOString(), to: to.toISOString()}));

	}

  convertToLine(key:string, map: Map<string, Value[]>): LineModel {

    let template = [      
      {x: new Date("2023-01-01T08:00").getTime(), key: 8},
      {x: new Date("2023-01-01T09:00").getTime(), key: 9},
      {x: new Date("2023-01-01T10:00").getTime(), key: 10},
      {x: new Date("2023-01-01T11:00").getTime(), key: 11},
      {x: new Date("2023-01-01T12:00").getTime(), key: 12},
      {x: new Date("2023-01-01T13:00").getTime(), key: 13},
      {x: new Date("2023-01-01T14:00").getTime(), key: 14},
      {x: new Date("2023-01-01T15:00").getTime(), key: 15},
      {x: new Date("2023-01-01T16:00").getTime(), key: 16},
      {x: new Date("2023-01-01T17:00").getTime(), key: 17},
      {x: new Date("2023-01-01T18:00").getTime(), key: 18},
      {x: new Date("2023-01-01T19:00").getTime(), key: 19},
      {x: new Date("2023-01-01T20:00").getTime(), key: 20},
      {x: new Date("2023-01-01T21:00").getTime(), key: 21},
      {x: new Date("2023-01-01T22:00").getTime(), key: 22},
      {x: new Date("2023-01-01T23:00").getTime(), key: 23},
      {x: new Date("2023-01-02T00:00").getTime(), key: 0},
      {x: new Date("2023-01-02T01:00").getTime(), key: 1},
      {x: new Date("2023-01-02T02:00").getTime(), key: 2},
      {x: new Date("2023-01-02T03:00").getTime(), key: 3},
      {x: new Date("2023-01-02T04:00").getTime(), key: 4},
      {x: new Date("2023-01-02T05:00").getTime(), key: 5},
      {x: new Date("2023-01-02T06:00").getTime(), key: 6},
      {x: new Date("2023-01-02T07:00").getTime(), key: 7},
    ];

    let result : LineModel =
    {
      label: "",
      points: []
    }
    
    let values = map.get(key);

    if (values && values.length > 0 ) {
      let minDate = new Date(values[0].time_stamp);
      
      result.label = minDate.toLocaleDateString();
      let now = new Date().toLocaleDateString();

      let current = now == result.label;

      template.forEach(elm => {
        let v = values?.find(val=> new Date(val.time_stamp).getHours() == elm.key);
        if (v && v["value"] !== undefined) {

          let point: PointModel = {
            x: elm.x,
            y: v.value*this.k,
            label: new Date(v.time_stamp).toLocaleString()
          }
          result.points.push(point);
        } else {
          if (current) {
            let v = this.rows?.find(val=> new Date(val.time_stamp).getHours() == elm.key);
            //console.log(v);
            if (v && v["f"] !== undefined) {
              let point: PointModel = {
                x: elm.x,
                y: v.f,
                label: new Date(v.time_stamp).toLocaleString(),
                forecast: true
              }
              result.points.push(point);
            }
          }
        }

      });

    }

    return result;
  }

  convertToLineForecast(table: ForecastRow[]): LineModel {

    let template = [      
      {x: new Date("2023-01-01T08:00").getTime(), key: 8},
      {x: new Date("2023-01-01T09:00").getTime(), key: 9},
      {x: new Date("2023-01-01T10:00").getTime(), key: 10},
      {x: new Date("2023-01-01T11:00").getTime(), key: 11},
      {x: new Date("2023-01-01T12:00").getTime(), key: 12},
      {x: new Date("2023-01-01T13:00").getTime(), key: 13},
      {x: new Date("2023-01-01T14:00").getTime(), key: 14},
      {x: new Date("2023-01-01T15:00").getTime(), key: 15},
      {x: new Date("2023-01-01T16:00").getTime(), key: 16},
      {x: new Date("2023-01-01T17:00").getTime(), key: 17},
      {x: new Date("2023-01-01T18:00").getTime(), key: 18},
      {x: new Date("2023-01-01T19:00").getTime(), key: 19},
      {x: new Date("2023-01-01T20:00").getTime(), key: 20},
      {x: new Date("2023-01-01T21:00").getTime(), key: 21},
      {x: new Date("2023-01-01T22:00").getTime(), key: 22},
      {x: new Date("2023-01-01T23:00").getTime(), key: 23},
      {x: new Date("2023-01-02T00:00").getTime(), key: 0},
      {x: new Date("2023-01-02T01:00").getTime(), key: 1},
      {x: new Date("2023-01-02T02:00").getTime(), key: 2},
      {x: new Date("2023-01-02T03:00").getTime(), key: 3},
      {x: new Date("2023-01-02T04:00").getTime(), key: 4},
      {x: new Date("2023-01-02T05:00").getTime(), key: 5},
      {x: new Date("2023-01-02T06:00").getTime(), key: 6},
      {x: new Date("2023-01-02T07:00").getTime(), key: 7},
    ];

    let result : LineModel =
    {
      label: "",
      points: []
    }
    
    let values = table.map(row=> {
      return {
        value: row.f,
        time_stamp : row.time_stamp
      }
    });

    if (values && values.length > 0 ) {
      let minDate = new Date(values[0].time_stamp);
      result.label = minDate.toLocaleDateString();

      template.forEach(elm => {
        let v = values?.find(val=> new Date(val.time_stamp).getHours() == elm.key);
        if (v && v["value"] !== undefined) {

          let point: PointModel = {
            x: elm.x,
            y: v.value*this.k,
            label: new Date(v.time_stamp).toLocaleString()
          }
          result.points.push(point);
        }

      });

    }

    return result;
  }

  rangeChanged(date: NgbDate): void {
    //console.log(date)
  }

  ngbDateToKey(d: NgbDate): string {
    return `${d.year}-${d.month}-${d.day}`;
  }

  ObjectParToKey(obj:number, par:number): string {
    return `${obj}.${par}`;
  }

  onForecastTableChanged(totals: ForecastRow)  {
    //console.log(totals);
    /* 2023-10-18 remove forecast from chart
    if (table && table.length > 0) {
      let line = this.convertToLineForecast(table);
      this.lineMap.set(line.label, line);      
      //console.log(this.lineMap)     
      this.lines = Array.from(this.lineMap.values());    
    }
    */
  }

  onDeleteRow(id:number) {
    let del_label = new Date(id).toLocaleDateString();

    this.lineMap.delete(del_label);
    this.lineMap1.delete(del_label);

    this.lines = Array.from(this.lineMap.values());
    this.lines1 = Array.from(this.lineMap1.values());

    //console.log(this.lineMap)
  }

  reloadCharts(newObject: number)  {
    this.lineMap.forEach( (value, key) => {
      let parts = key.split(".");
      let from8 = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T08:00:00`);
      let to8 = new Date(`${parts[2]}-${parts[1]}-${parts[0]}T08:00:00`);
      to8.setDate(to8.getDate()+1);      
      this.store.dispatch(actions1.loadTable1({objects:[newObject, this.obj_w], parameters:[8,4], from: from8.toISOString(), to: to8.toISOString()}));  
    });
  }

  regionChanged(region: number) { 
    console.log(region)
    switch (region) {
      case 0:
        this.KEY = "9900403.8";
        this.obj = 9900403;
        this.obj_w = 28;
        this.title = this.consume_title + ", центральний регіон";        
        this.title1 = this.t_title + ", центральний регіон";
        break;
      case 1:
        this.KEY = "9900401.8";
        this.obj = 9900401;
        this.obj_w = 26;        
        this.title = this.consume_title + ", північний регіон";        
        this.title1 = this.t_title + ", північний регіон";
        break;
      case 2:
        this.KEY = "9900404.8";
        this.obj = 9900404;
        this.obj_w = 27;        
        this.title = this.consume_title + ", західний регіон";        
        this.title1 = this.t_title + ", західний регіон";
        break;
      case 3:
        this.KEY = "9900402.8";
        this.obj = 9900402;
        this.obj_w = 29;        
        this.title = this.consume_title + ", східний регіон";        
        this.title1 = this.t_title + ", східний регіон";

        break;
      case 4:
        this.KEY = "9900405.8";
        this.obj = 9900405;
        this.obj_w = 25;        
        this.title = this.consume_title + ", загалом";        
        this.title1 = this.t_title + ", загалом";
        break;            
    }
    
    this.reloadCharts(this.obj);
    
    this.fkOnInit();
  }

//add  2023-10-27 for flow forecast -----------
fkOnInit(): void {
  let today = new Date();
 
  today.setTime(today.getTime() - (this.CONTRACT_HOUR*60*60*1000));  //contract hour shift
  today.setHours(this.CONTRACT_HOUR,0,0,0);
  //console.log("Date selection changed ", date)

  this.currentGasDay = today;

  this.gasDay_1 = new Date(today);
  this.gasDay_1.setDate(today.getDate() - 1);

  this.gasDay_2 = new Date(today);
  this.gasDay_2.setDate(today.getDate() - 2);

  this.gasDay_3 = new Date(today);
  this.gasDay_3.setDate(today.getDate() - 3);

  this.gasDay_7 = new Date(today);
  this.gasDay_7.setDate(today.getDate() - 9);


  let from = new Date(today);
  let to = new Date(today);
  
  from.setDate(from.getDate() - 4);
  to.setDate(to.getDate() + 1);

  //різниця споживання ГРС - Загалом
  this.store.dispatch(actions1.loadDiffTable({objects:[9900419], parameters:[63], from: this.gasDay_7.toISOString(), to: this.gasDay_2.toISOString()}));
  this.store.dispatch(actions1.loadFlowForecastTable({objects:[this.obj], parameters:[this.par], from: from.toISOString(), to: to.toISOString()}));
}

fkconvertToLine(key:string, map: Map<string, Value[]>):ForecastRow[]  {
    
  let result:ForecastRow[] = [];

  let template = [
    {x: "08:00", key: 8},
    {x: "09:00", key: 9},
    {x: "10:00", key: 10},
    {x: "11:00", key: 11},
    {x: "12:00", key: 12},
    {x: "13:00", key: 13},
    {x: "14:00", key: 14},
    {x: "15:00", key: 15},
    {x: "16:00", key: 16},
    {x: "17:00", key: 17},
    {x: "18:00", key: 18},
    {x: "19:00", key: 19},
    {x: "20:00", key: 20},
    {x: "21:00", key: 21},
    {x: "22:00", key: 22},
    {x: "23:00", key: 23},
    {x: "00:00", key: 0},
    {x: "01:00", key: 1},
    {x: "02:00", key: 2},
    {x: "03:00", key: 3},
    {x: "04:00", key: 4},
    {x: "05:00", key: 5},
    {x: "06:00", key: 6},
    {x: "07:00", key: 7},
  ];

  let values = map.get(key);

  //console.log(this.rows)

  if (values && values.length > 0)  {

    template.forEach(element => {
      let row_data = values?.filter(v=> {
        let ts = new Date(v.time_stamp);
        return ts.getHours() == element.key;
      });

      if (row_data && row_data.length > 0) {
        let r = this.createForecastRow(row_data, element, this.currentGasDay);
        //console.log(r)
        result.push(r);
      }        
    });
}
  //console.log(result)
  return result;
}

createForecastRow(row_data: Value[], template: any, gasDay: Date) {    
  let dayMsLength = 1000*60*60*24;    
  let result: any = {};
  result.hour = template.x;

  row_data?.forEach(v => {

    if (v.value != null || v.value != undefined) {
      let ts = new Date(v.time_stamp);
    
      let diff: number = gasDay.getTime() - ts.getTime();

      //console.log(template.x, v, diff, gasDay);

      if (diff <= 0) {
        result.d = v.value;
        result.ds = v.value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
        } else {

          let days = diff / dayMsLength;

          if (days <= 1) {
            let ts = new Date(v.time_stamp);
            ts.setDate(ts.getDate() + 1);
            result.time_stamp = ts;
            result.d_1 = v.value;
            result.d_1s = v.value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  
        } else if (days <= 2) {
          result.d_2 = v.value;
          result.d_2s = v.value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  
        } else if (days <= 3) {
          result.d_3 = v.value;
          result.d_3s = v.value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

        } else if (days <= 4) {
          result.d_4 = v.value;
          result.d_4s = v.value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
        }
      }

    }

  });

  return result;
}

calc1(rows: ForecastRow[]) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.d) {
      let k = row.d / row.d_1;
      for (let j = i; j < rows.length; j++) {
        const row = rows[j];
        row.k = k;
        row.ks = k.toFixed(3);
      }          
    }
  }
}

calc2(rows: ForecastRow[]) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    row.f =  row.d_1 * row.k;
    row.d_f = row.f.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  }
}

calc3(rows: ForecastRow[]) {
  let totals: ForecastRow = {
    hour: "\u03A3=24",
    d_4: 0,
    d_3: 0,
    d_2: 0,
    d_1: 0,
    d: 0,
    d_4s: "",
    d_3s: "",
    d_2s: "",
    d_1s: "",
    ds:   "",      
    k:   0,
    ks:  "",
    f:   0,
    d_f: "",
    time_stamp : new Date()
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    totals.d_4 += row.d_4 ?? 0;
    totals.d_3 += row.d_3 ?? 0;
    totals.d_2 += row.d_2 ?? 0;
    totals.d_1 += row.d_1 ?? 0;
    totals.d += row.d ? row.d : 0;
    totals.f += row.f;
  }

  totals.d_4s = totals.d_4.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_3s = totals.d_3.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_2s = totals.d_2.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_1s = totals.d_1.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_f = totals.f.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.ds = totals.d.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

  return totals;
}

calc4(row: ForecastRow) {
  let totals: ForecastRow = {
    hour: "Тренд",
    d_4: 0,
    d_3: 0,
    d_2: 0,
    d_1: 0,
    d: 0,
    d_4s: "",
    d_3s: "",
    d_2s: "",
    d_1s: "",
    ds:   "",      
    k:   0,
    ks:  "",
    f:   0,
    d_f: "",
    time_stamp : new Date()
  };
  
  totals.d_4s = totals.d_4.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_3s = totals.d_3.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_2s = totals.d_2.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  totals.d_1s = totals.d_1.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});


  totals.f = row.f - row.d_1;
  totals.d_f = totals.f > 0 ? 
    "+" + totals.f.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}) 
    : totals.f.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

  totals.d = row.d - row.d_1;
  totals.ds = totals.d.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

  totals.d_1 = row.d_1 - row.d_2;
  totals.d_1s = totals.d_1 > 0 ? 
    "+" + totals.d_1.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}) 
    : totals.d_1.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

  totals.d_2 = row.d_2 - row.d_3;
  totals.d_2s = totals.d_2 > 0 ? 
    "+" + totals.d_2.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}) 
    : totals.d_2.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

  totals.d_3 = row.d_3 - row.d_4;
  totals.d_3s = totals.d_3 > 0 ? 
    "+" + totals.d_3.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}) 
    : totals.d_3.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
  

  return totals;
}
//---------------------------------------------

calcTodayYesterday(map: Map<string, Value[]>) {
  const TOTAL_KEY = "9900241.63";
  const OGSU_KEY = "9900420.63";
  const DELTA_KEY = "9900419.63";
  const VYDOB_KEY = "9900242.63";
  const ZMIN_MC_KEY = "9900294.63";
  

  let current =  this.currentDay ? this.currentDay.toISOString().substring(0,10) : "";
  let yester =  this.yesterdayDay ? this.yesterdayDay.toISOString().substring(0,10) : "";
  let day_2 =  this.day_2 ? this.day_2.toISOString().substring(0,10) : "";
  //console.log(current, yester);
  
  if (map && map.size > 0) {

    const map1 = new Map<string, Value[]>(JSON.parse(JSON.stringify([...map])));  //deep clone

    let totals = map1.get(TOTAL_KEY);
    let ugsus = map1.get(OGSU_KEY);
    let deltas = map1.get(DELTA_KEY);
    let vydob = map1.get(VYDOB_KEY);
    
    //console.log( vydob)


    if (vydob) {
      let t = vydob.find(v=>  day_2 == v.time_stamp.toString().substring(0,10));
      if (t){
        if (t.value) this.vydob_2 = t.value;
      }
    }

    if (vydob) {
      let t = vydob.find(v=>  current == v.time_stamp.toString().substring(0,10));
      if (t){
        t.value = this.vydob_2;
      }
    }

    if (vydob) {
      let t = vydob.find(v=>  yester == v.time_stamp.toString().substring(0,10));
      if (t)  {
        t.value = this.vydob_2;
      }
    }



    if (totals) {
      
      if (current == totals[0].time_stamp.toString().substring(0,10)){
        if (this.totals) totals[0].value = this.totals?.f + this.diffAverage;
      }
    }
    if (ugsus) {
      //console.log(ugsus[0].time_stamp.toString().substring(0,10) ,current))
      if (ugsus[0].time_stamp.toString().substring(0,10) == current){
        if (this.totals) ugsus[0].value = this.totals?.f;
      }
    }
    if (deltas) {
      if (deltas[0].time_stamp.toString().substring(0,10) == current){
        deltas[0].value = this.diffAverage;
        //console.log(this.diffAverage);
      }
    }

    //-----------------------------------------------------------------------
    if (totals) {
      if (totals[0].time_stamp.toString().substring(0,10) == yester){
        //console.log( yester ,totals[0].time_stamp.toString().substring(0,10))
        if (this.totals) totals[0].value = this.totals?.d_1 + this.diffAverage;
      }
    }
    if (ugsus) {
      if (ugsus[0].time_stamp.toString().substring(0,10) == yester){
        if (this.totals) ugsus[0].value = this.totals?.d_1;
      }
    }
    if (deltas) {
      if (deltas[0].time_stamp.toString().substring(0,10) == yester){
        deltas[0].value = this.diffAverage;
        
      }
    }

    return map1;
    
  }
return map;
}

}
