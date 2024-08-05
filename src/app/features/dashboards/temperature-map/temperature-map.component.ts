import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { City, RowValue, Value } from './temperature-map.models';

import * as dataActions from '../../../state/opdata.actions'
import * as weatherActions from '../../../state/temperatures.actions'
import * as weatherSelectors from '../../../state/temperatures.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-temperature-map',
  templateUrl: './temperature-map.component.html',
  styleUrls: ['./temperature-map.component.scss']
})
export class TemperatureMapComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  dataMap$ = this.store.select(weatherSelectors.selectWheatherMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDateIso);
  selectWheatherMapCityRows$ = this.store.select(weatherSelectors.selectWheatherMapCityRows);
  selectedCity$ = this.store.select(weatherSelectors.selectedCity);
  selectedCity : City = {location_id:0, name:""};

  dateTimeIso:string="";

  ukrTable : RowValue[] = [];
  //order from west to east
  cityOrder = [6,12,8,2,18,23,16,21,1,5,9,14,24,13,22,10,20,15,17,3,7,19,4,11];


  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Середня температура',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //pointRadius: 2,

        fill: 'origin',
      }
    // ... add dataset here
    ],

    };

    lineChartOptions: ChartConfiguration['options'] = {
      elements: {
        line: {
          tension: 0.5
        }
      },
      plugins:{
        tooltip:{
          enabled: true
        },
        legend:{
          labels: {
          }
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.chart.data.labels && value > 0) {
              //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
              return "";
            }
            return ''
          }, 
          font: (ctx) => {
            return {
              weight:"bold",
              size:16
            };
          }
        },
      }
    };
    
  lineChartType: ChartType = 'line';

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
    let d = this.selectLineData( this.selectedCity.location_id , 3, map);
    let v = d.map(v=> v.value);
    let l = d.map(v=> new Date(v.time_stamp).toLocaleDateString());
    this.lineChartData.datasets[0].data = v;
    this.lineChartData.datasets[0].label = this.selectedCity.name;
    this.lineChartData.labels =l;
    this.chart?.update();

    //this.ukrTable = this.selectRows(25, map);

  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(weatherActions.loadApidata());
    this.dateTimeIso = d;
 
  });

  sub3 = this.selectWheatherMapCityRows$.subscribe(d=>{
    this.ukrTable = d;
  });

  sub4 = this.selectedCity$.subscribe(c=>{
    this.selectedCity = c || {location_id:0, name:""};

    let d = this.selectLineData( this.selectedCity.location_id , 3, this.dataMap);
    let v = d.map(v=> v.value);
    let l = d.map(v=> new Date(v.time_stamp).toLocaleDateString());
    this.lineChartData.datasets[0].data = v;
    this.lineChartData.datasets[0].label = this.selectedCity.name;
    this.lineChartData.labels =l;
    this.chart?.update();


  });

  constructor(private store: Store, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.store.dispatch(weatherActions.loadCitiesNsi());
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

  decode(order: number[], map : Map<string, Value[]>) : number[] {
    let res: number[] = [];
    order.forEach( (location_id, i) => {
      let values = map.get(location_id.toString());
      if (values && values.length == 3) {
        res[i] = Math.round(values[2].value);
      }
    });
    return res;
  }

  selectLineData(location_id: number, param:number, map : Map<string, Value[]>) : Value[] {
    let res: Value[] = [];
    let v = map.get(`${location_id}`);
    if (!v) return res;
    return v.filter(v=> v.parameter == param);
  }

  selectRows(location_id: number, map : Map<string, Value[]>) : RowValue[] {
    let res: RowValue[] = [];
    let valArray = map.get(`${location_id}`);
    
    if (!valArray) return res;

    let newMap : Map<string, Value[]> = new Map<string, Value[]>();
    
    valArray.forEach(val => {
      let ts = new Date(val.time_stamp).toISOString();      
      if (!newMap.has(ts)) newMap.set(ts, []);
      newMap.get(ts)?.push(val);
    });

    newMap.forEach( (val, key) => {
      let row: RowValue = {
        time_stamp : new Date(key).toLocaleDateString(),
        Tmin: "",
        Tmax: "",
        Tavg: "",
        weekDay:""
      }

      let min = val.find(v=> v.parameter == 1);
      let max = val.find(v=> v.parameter == 2);
      let avg = val.find(v=> v.parameter == 3);

      row.Tmin = min? min.value.toFixed(1) : "---";
      row.Tmax = max? max.value.toFixed(1) : "---";
      row.Tavg = avg? avg.value.toFixed(1) : "---";

      res.push(row);
    });
   return res; 
  }

  
  export() : void {
    this.store.dispatch(dataActions.xlsExportRange( {
      objects: [Number(this.selectedCity.location_id)], 
      parameters: [1,2,3],
      fileName: `${this.selectedCity.name}_погода_весь_період.xlsx`,   //TODO !!!
      from: "2020-01-01",
      to: "2025-01-01"
      }));
  }

  cityClick(id:string) {
    this.store.dispatch(weatherActions.selectCity({id}));
  }
}

