
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartEvent, ChartType, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ID, Value } from '../parameter-trend/parameter-trend.models';
import { formatDate } from '@angular/common';
import { AgsiDayData } from '../../dashboards/agsi-gie-eu/agsi-gie-eu.models';
import { NgbDatesRange } from '../../range/range.models';

@Component({
  selector: 'app-agsi-eu-trend',
  templateUrl: './agsi-eu-trend.component.html',
  styleUrls: ['./agsi-eu-trend.component.scss']
})
export class AgsiEuTrendComponent implements OnInit, OnChanges, OnDestroy {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  @Input() displayMeters: boolean = true;
  @Input() code: string = "";
  @Input() data: AgsiDayData[] = [];
  @Output() rngChanged: EventEmitter<NgbDatesRange> = new EventEmitter();

  range?: NgbDatesRange;

  title: string = "";
  
  from: NgbDateStruct =  new NgbDate(2023,5,1);
  to: NgbDateStruct = new NgbDate(2023,5,31);


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

    constructor(private calendar: NgbCalendar) {       
    }

    ngOnInit(): void {
      this.to = this.calendar.getPrev(this.calendar.getToday(), 'd', 1);      
      this.from = this.calendar.getPrev(this.calendar.getToday(), 'd', 32);      
    }
    
    ngOnChanges(changes: SimpleChanges) {
      if (changes["data"] && this.data.length > 0 ) {
        //console.log("ngOnChanges", this.from);
        //this.loadData();
        let v = this.data.map(v=> Number(v.gasInStorage));
        //console.log(v)

        let l = this.data.map(v=> formatDate(v.gasDayStart, 'dd.MM.yy', 'en-US'));
        this.lineChartData.datasets[0].data = v;
        this.lineChartData.labels =l;
        this.chart?.update();
  
      }
    }

    rangeChanged(date: NgbDate): void {
      //console.log(this.from, this.to);
      this.range = {from: this.from, to: this.to};
      this.rngChanged.emit(this.range);
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
