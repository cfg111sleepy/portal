import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegionsConsumeRow } from 'src/app/models/http';
import { Store } from '@ngrx/store';
import * as actions from '../../../../state/http-comms.actions';
import * as selectors from '../../../../state/http-comms.selectors'
import { Value } from '../../../../features/dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-regions-consume-table',
  templateUrl: './regions-consume-table.component.html',
  styleUrls: ['./regions-consume-table.component.scss']
})
export class RegionsConsumeTableComponent implements OnInit {

  constructor(private store: Store) { }

  @Output() regionChanged = new EventEmitter<number>();

  selectedRegion:number =4;

  CONTRACT_HOUR: number = 8;
  
  currentGasDay: Date = new Date("2023-01-01T07:00:00");

  gasDay_1: Date = new Date("2023-01-01T07:00:00");
  gasDay_2: Date = new Date("2023-01-01T07:00:00");
  gasDay_3: Date = new Date("2023-01-01T07:00:00");

  rows: RegionsConsumeRow[] = [];

  dataMap$ = this.store.select(selectors.selectConsumeRegionsMap);
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    //console.log(map);
    this.dataMap = map;

    this.rows = [];

    //console.log(r);
    let r = this.convertToLine( "9900403.8", map);
    let totals = this.calc3(r);
    totals.name = "Центральний регіон";
    this.rows.push(totals);

    r = this.convertToLine( "9900401.8", map);
    totals = this.calc3(r);
    totals.name = "Північний регіон";
    this.rows.push(totals);

    r = this.convertToLine( "9900404.8", map);
    totals = this.calc3(r);
    totals.name = "Західний регіон";
    this.rows.push(totals);

    r = this.convertToLine( "9900402.8", map);
    totals = this.calc3(r);
    totals.name = "Східний регіон";
    this.rows.push(totals);

    r = this.convertToLine( "9900405.8", map);
    totals = this.calc3(r);
    totals.name = "Загалом";
    this.rows.push(totals);
    //console.log(totals);
  });

  ngOnInit(): void {
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

    let from = new Date(today);
    let to = new Date(today);
    
    from.setDate(from.getDate() - 4);
    to.setDate(to.getDate() + 1);

    this.store.dispatch(actions.loadConsumeRegionsTable({objects:[9900401,9900402,9900403,9900404,9900405,], parameters:[8], from: from.toISOString(), to: to.toISOString()}));
  }


  convertToLine(key:string, map: Map<string, Value[]>): any[]  {
    
    let result: any[] = [];

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

  calc3(rows: RegionsConsumeRow[]) {
    let totals: RegionsConsumeRow = {
      d_3: 0,
      d_2: 0,
      d_1: 0,
      d_3s: "",
      d_2s: "",
      d_1s: "",
    };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      totals.d_3 += row.d_3 ?? 0;
      totals.d_2 += row.d_2 ?? 0;
      totals.d_1 += row.d_1 ?? 0;
    }

    totals.d_3s = totals.d_3.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
    totals.d_2s = totals.d_2.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
    totals.d_1s = totals.d_1.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

    return totals;
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  clickRegion(region: number){ 
    this.selectedRegion = region;
    this.regionChanged.emit(region);

  }

}
