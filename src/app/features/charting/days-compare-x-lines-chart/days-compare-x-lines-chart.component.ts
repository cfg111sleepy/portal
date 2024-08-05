import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType, ScatterDataPoint, TooltipItem, TooltipModel } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
import 'chartjs-adapter-date-fns';
import {uk} from 'date-fns/locale';


interface PointModel {
  x: number;
  key: number;
  y: Map<number, Value>;
}

interface ViewModel {
  points: PointModel[];
  dates: number[];
}


@Component({
  selector: 'app-days-compare-x-lines-chart',
  templateUrl: './days-compare-x-lines-chart.component.html',
  styleUrls: ['./days-compare-x-lines-chart.component.scss']
})
export class DaysCompareXLinesChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key1 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() title? : string;

  viewData: ViewModel = {
    points: [],
    dates: []  
  };
  
  constructor() { }

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],  //1
        label: 'Д',
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
        label: 'Д-1',
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
        label: 'Д-2',
        backgroundColor: 'Coral',
        borderColor: 'Coral',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        //fill: 'origin',
      },
      {
        data: [ ],  //4
        label: 'Д-3',
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
        label: 'Д-4',
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
        label: 'Д-5',
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
        label: 'Д-6',
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
        label: 'Д-7',
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
    this.chart?.update();
    //this.chartData.datasets[1].label = this.label2;
    this.chart?.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values1 = this.data.get(this.key1);

      if(values1) {
        this.viewData = this.createMap(values1);
        //console.log(this.viewData)      
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[1].data = [];
        this.chartData.datasets[2].data = [];
        this.chartData.datasets[3].data = [];
        this.chartData.datasets[4].data = [];
        this.chartData.datasets[5].data = [];
        this.chartData.datasets[6].data = [];
        this.chartData.datasets[7].data = [];


        this.viewData.dates.reverse().forEach( (day,i)=> {
          let temp = this.viewData.points.map(v=> { return { y: v.y.get(day)?.value ?? -1000, x: v.x} });            
          this.chartData.datasets[i].data = temp.filter(v=> v.y != -1000);            
        });
    
        this.chart?.update();  
      } else {
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[1].data = [];
        this.chartData.datasets[2].data = [];
        this.chartData.datasets[3].data = [];
        this.chartData.datasets[4].data = [];
        this.chartData.datasets[5].data = [];
        this.chartData.datasets[6].data = [];
        this.chartData.datasets[7].data = [];

        this.chart?.update();  
      }

    }
  }

  createMap(data: Value[]): ViewModel {
    let model: ViewModel = {
      points: [
        {x: new Date("2023-01-01T08:00").getTime(), key: 8, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T10:00").getTime(), key: 10, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T12:00").getTime(), key: 12, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T14:00").getTime(), key: 14, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T16:00").getTime(), key: 16, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T18:00").getTime(), key: 18, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T20:00").getTime(), key: 20, y: new Map<number, Value>()},
        {x: new Date("2023-01-01T22:00").getTime(), key: 22, y: new Map<number, Value>()},
        {x: new Date("2023-01-02T00:00").getTime(), key: 0, y: new Map<number, Value>()},
        {x: new Date("2023-01-02T02:00").getTime(), key: 2, y: new Map<number, Value>()},
        {x: new Date("2023-01-02T04:00").getTime(), key: 4, y: new Map<number, Value>()},
        {x: new Date("2023-01-02T06:00").getTime(), key: 6, y: new Map<number, Value>()},
      ],
      dates: []  
    };

    let lastDay = -1;
      data.forEach(v => {
        let hh = new Date(v.time_stamp).getHours();

        model.points.forEach(vd => {        
          if (vd.key == hh) {
            let ts = new Date(v.time_stamp);
            ts.setTime(ts.getTime() - (7*60*60*1000));  //shift contract hour
            let day = ts.getDay()
            vd.y.set(day, v); //day is chart line code !!!
            if (lastDay != day) {
              model.dates.push(day);
              lastDay = day;
            }
          }
        });       
  
      });      

      
    return model;
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}

