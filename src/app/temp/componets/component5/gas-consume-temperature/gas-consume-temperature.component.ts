import { Component, OnInit, OnDestroy,Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Value } from '../../../../features/dashboards/gas-storage-map/gas-storage-map.models';
import { ForecastRow } from 'src/app/models/http';

interface ConsumeTemperatureRow {
  color?:string;
  date?:string;
  time:  number;
  tov_q?:  number;
  delta_q?:number;
  total_q?:number;
  t_max?:  number;
  t_min?:  number;
  t_avg?:  number;
  vydob?:  number;
  zmina_mc?:  number;
  zmina_psg?:  number;

  tov_qs?:  string;
  delta_qs?:string;
  total_qs?:string;
  t_maxs?:  string;
  t_mins?:  string;
  t_avgs?:  string;
  vydobs?:  string;
  zmina_mcs?:  string;
  zmina_psgs?:  string;

}

@Component({
  selector: 'app-gas-consume-temperature',
  templateUrl: './gas-consume-temperature.component.html',
  styleUrls: ['./gas-consume-temperature.component.scss']
})
export class GasConsumeTemperatureComponent implements OnInit, OnChanges, OnDestroy {  
  
  constructor() { }
  
  @Input() data? : Map<string, Value[]>;
  @Output() rowDeleting = new EventEmitter<number>();

  TOTAL_KEY = "9900241.63";
  OGSU_KEY = "9900420.63";
  DELTA_KEY = "9900419.63";
  TAVG_KEY = "25.3";
  VYDOB_KEY = "9900242.63";
  ZMIN_MC_KEY = "9900294.63";


  table: ConsumeTemperatureRow[] = [];


  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data && this.data.size > 0 ) {
      this.addRow(this.data);  
    }
  }

  addRow(map: Map<string, Value[]>) {    
    let values1 = map.get(this.TOTAL_KEY);
    let values2 = map.get(this.OGSU_KEY);
    let values3 = map.get(this.DELTA_KEY);
    let values4 = map.get(this.VYDOB_KEY);
    let values5 = map.get(this.ZMIN_MC_KEY);
    let values6 = map.get(this.TAVG_KEY);

    let row : ConsumeTemperatureRow = {time:0};

     if (values1 && values1.length > 0 ) {
      let minDate = new Date(values1[0].time_stamp);
      row.date = minDate.toLocaleDateString();
      row.time = minDate.getTime();
      row.total_q = values1[0].value;
      row.total_qs = values1[0].value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}); 
    }

    if (values2 && values2.length > 0 ) {
      row.tov_q= values2[0].value;
      row.tov_qs = values2[0].value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
    }

    if (values3 && values3.length > 0 ) {
      row.delta_q= values3[0].value;
      row.delta_qs = values3[0].value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});
    }

    if (values4 && values4.length > 0 ) {
      row.vydob = values4[0].value;
      row.vydobs = row.vydob ? values4[0].value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}) : "";
    }

    if (values5 && values5.length > 0 ) {
      row.zmina_mc = values5[0].value;
      row.zmina_mcs = row.zmina_mc? values5[0].value.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3}): "";
    }

    if (values6 && values6.length > 0 ) {
      row.t_avg = values6[0].value;
      row.t_avgs = values6[0].value.toFixed(1);
    }

    row.zmina_psg =  (row.vydob ?? 0) - (row.total_q ?? 0) + (row.zmina_mc ?? 0);
    row.zmina_psgs = row.zmina_psg.toLocaleString("fr-CA", {minimumFractionDigits: 3, maximumFractionDigits: 3});

    if (row.date) {
      let key = this.table.find(r=> r.date == row.date);
      
      if (key) return;  //duplicate ! row exists in table

      let line = (this.table.length + 0) % 8; //+1 coz current day line is present ???

      row.color = "line"+line;

      //console.log(row.color);

      this.table.push(row);

      this.table.sort((a,b)=>{
        return a.time - b.time; 
      });

    }

  }

  addFixedRows() {    
    let row : ConsumeTemperatureRow = {time:0};    
    let minDate = new Date();
    row.date = minDate.toLocaleDateString();
    row.time = minDate.getTime();


    this.table.push(row);

    this.table.sort((a,b)=>{
      return a.time - b.time; 
    });
  }

  deleteRow(id:number) {
    let deleted = this.table.filter(r=> r.time != id);
    this.table = deleted;
    this.rowDeleting.emit(id);
  }

  ngOnDestroy() {
    //this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

}
