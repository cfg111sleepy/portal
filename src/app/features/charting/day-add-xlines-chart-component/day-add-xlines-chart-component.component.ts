import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType, ScatterDataPoint, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import {uk} from 'date-fns/locale';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

export interface PointModel {
  label: string;
  x: number;
  y: number;
  forecast?: boolean;
}

export interface LineModel {
  label: string;
  points: PointModel[];
}

@Component({
  selector: 'app-day-add-xlines-chart-component',
  templateUrl: './day-add-xlines-chart-component.component.html',
  styleUrls: ['./day-add-xlines-chart-component.component.scss']
})
export class DayAddXLinesChartComponentComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  @Input() data : LineModel[] = []; 
  @Input() title?: string;
  
  constructor() { }

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],  //1
        label: '',
        backgroundColor: 'DeepSkyBlue',
        borderColor: 'DeepSkyBlue',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //fill: 'origin',
      },
      {
        data: [ ],  //2
        label: '',
        backgroundColor: '#0063af',
        borderColor: '#0063af',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //3
        label: '',
        backgroundColor: 'Coral',
        borderColor: 'Coral',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
        segment:{
          borderColor: ctx => {
            //console.log(ctx.p0DataIndex, ctx.p1DataIndex);
            return 'Coral';
          },
          borderDash: ctx => {
            //console.log(this.data[2].points[ctx.p1DataIndex]);
            if (this.data && this.data[2] && this.data[2].points[ctx.p1DataIndex].forecast) {
              return [6, 6];
            } else {
              undefined;
            }
            return undefined;
          },
        },
        spanGaps: true
      },
      {
        data: [ ],  //4
        label: '',
        backgroundColor: 'CadetBlue',
        borderColor: 'CadetBlue',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //5
        label: '',
        backgroundColor: '#9b172d',
        borderColor: '#9b172d',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //6
        label: '',
        backgroundColor: '#1d1d1b',
        borderColor: '#1d1d1b',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //7
        label: '',
        backgroundColor: '#ffd744',
        borderColor: '#ffd744',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //8
        label: '',
        backgroundColor: '#459534',
        borderColor: '#459534',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
    ],
    //labels: [ ],
    
  };

  public chartOptions: ChartConfiguration['options'] = {
    elements: {      
      line: {
        tension: 0
      }
    },
    scales: {
      x: {
        type:'time',
        time:{ 
          unit: 'hour',
          displayFormats: { hour: 'HH' }
        },
        adapters:{ 
          date: {
            locale: uk
          }}
      },
      'y-axis-0':
        {
          position: 'left',
          ticks: {
            callback: (val) => {
                if ( !Number.isNaN(val) &&  Number(val) < 1000) {
                  return "     " + val.toLocaleString("fr-CA", {minimumFractionDigits: 0, maximumFractionDigits: 0});
                } else {
                  return val.toLocaleString("fr-CA", {minimumFractionDigits: 0, maximumFractionDigits: 0});
                }

              return val;             
            },
          },
        },
    },
    plugins: {
      title: {
        display: true,  //название графика всего !!!
        text: this.title
      },
      tooltip:{
        //enabled: true,
        callbacks: {
          title: (tooltipItem: TooltipItem<"line">[]) => {
            return "";
          },

          beforeLabel: (tooltipItem: TooltipItem<"line">) => {
            return "";
          },
          label: (tooltipItem: TooltipItem<"line">) => {
            let i = tooltipItem.dataIndex;
            let data = tooltipItem.dataset.data;
            let label = tooltipItem.dataset.label;
            let value = data[i] as ScatterDataPoint;            
            let hh = new Date(value.x).getHours();
            //console.log(tooltipItem)
            let newHint = `${label} : ${hh}:00 : ${tooltipItem.formattedValue}`
            return newHint;
          }
        },        
      },
      legend: {
        display: true, //lines description 
        labels: {
        }
      },
      datalabels: {
        //display: true,
        color: "black",
        align: 'top',
        padding: 0.5,
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && value) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label
            //console.log(value)
            //return Number(value.y).toFixed(0);
          }
          return '';
        }, 
        font: (ctx) => {
          return {
            //weight:"bold",
            size:10,
          };
        }
      },
    },
  };

  public lineChartType: ChartType = 'line';

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.chartData.datasets[0].label = this.label1;
    //this.chartData.datasets[1].label = this.label2;
    if (this.chart?.options?.plugins?.title){
      this.chart.options.plugins.title.text = this.title;
    }
    this.chart?.update();
    this.chart?.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      
      //console.log(this.title)

        //console.log(this.viewData)      
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[1].data = [];
        this.chartData.datasets[2].data = [];
        this.chartData.datasets[3].data = [];
        this.chartData.datasets[4].data = [];
        this.chartData.datasets[5].data = [];
        this.chartData.datasets[6].data = [];
        this.chartData.datasets[7].data = [];

        this.chartData.datasets[0].label = "";
        this.chartData.datasets[1].label = "";
        this.chartData.datasets[2].label = "";
        this.chartData.datasets[3].label = "";
        this.chartData.datasets[4].label = "";
        this.chartData.datasets[5].label = "";
        this.chartData.datasets[6].label = "";
        this.chartData.datasets[7].label = "";

        this.data.forEach( (line,i)=> {
          this.chartData.datasets[i].label = line.label;
          this.chartData.datasets[i].data = line.points;
        });
        
        if (this.chart?.options?.plugins?.title){
          this.chart.options.plugins.title.text = this.title;
        }       

        this.chart?.update();  
        this.chart?.render();

    }


  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}

