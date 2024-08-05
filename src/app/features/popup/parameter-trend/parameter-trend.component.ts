import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartEvent, ChartType, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ID, Value } from './parameter-trend.models';
import { ParameterTrendService } from './parameter-trend.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-parameter-trend',
  templateUrl: './parameter-trend.component.html',
  styleUrls: ['./parameter-trend.component.scss']
})
export class ParameterTrendComponent implements OnInit, OnChanges, OnDestroy {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key: string = "9900402.8";


  title: string = "";
  
  from: NgbDateStruct =  new NgbDate(2023,5,1);
  to: NgbDateStruct = new NgbDate(2023,5,31);

  table: Value[] = [];


  //chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: this.title,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {             
      },
      y: {            
      }
    },
    plugins:{
      title: {
        display: false,  //название графика всего !!!
        text: this.title
      },
      tooltip:{
        enabled: true
      },
      legend:{
        display: false,
        labels: {          
        }
      },
      datalabels: {
        display: false,
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

  public lineChartType: ChartType = 'line';

  //variables end ------------------------------------------------------------------

    constructor(private http: ParameterTrendService,private calendar: NgbCalendar) {       
    }

    ngOnInit(): void {
      this.to = this.calendar.getNext(this.calendar.getToday(), 'd', 1);      
      this.from = this.calendar.getPrev(this.calendar.getToday(), 'd', 2);      
      console.log("ngInit", this.from, this.key);
      this.loadData();
    }
    
    ngOnChanges(changes: SimpleChanges) {
      if (changes["key"] && this.key ) {
        //console.log("ngOnChanges", this.from);
        //this.loadData();
      }
    }

    rangeChanged(date: NgbDate): void {
      //console.log(this.from, this.to);
      this.loadData();
    }

    loadData() {
      let from = new Date(this.from.year, this.from.month-1, this.from.day, 7,0,0,0);
      let to = new Date(this.to.year, this.to.month-1, this.to.day, 7,0,0,0);
      let id = this.splitKey(this.key);

      let sub1 = this.http.getTable([id.object], [id.parameter], from.toISOString(), to.toISOString()).subscribe(res=>{
        //console.log(res);
        let filtered = res.data[0].values.filter(v=> v.value != undefined);
        
        this.table = filtered;
        
        let v = filtered.map(v=> v.value);
        //console.log(v);
        let l = filtered.map(v=> formatDate(v.time_stamp, 'dd.MM, HH:mm', 'en-US'));
        //console.log(l);
        this.lineChartData.datasets[0].data = v;
        this.lineChartData.labels =l;
        this.chart?.update();

      });

    }
    // events
    chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      //console.log(event, active);
    }
  
    chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      //console.log(event, active);
    }

    splitKey(key:  string) : ID {
      let parts = key.split('.');
      return {object: Number(parts[0]), parameter: Number(parts[1])}
    }

    ngOnDestroy(): void {
    }
}
