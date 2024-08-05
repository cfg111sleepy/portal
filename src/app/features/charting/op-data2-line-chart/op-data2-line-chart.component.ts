import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
import 'chartjs-adapter-date-fns';
import {uk} from 'date-fns/locale';

@Component({
  selector: 'app-op-data2-line-chart',
  templateUrl: './op-data2-line-chart.component.html',
  styleUrls: ['./op-data2-line-chart.component.scss']
})
export class OpData2LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key1 = "";
  @Input() key2 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() label1 = 'P';
  @Input() label2 = 'P';//'Ціна газу, грн'
  @Input() title = 'Ціна газу, грн';

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: this.label1,
        backgroundColor: 'DeepSkyBlue',
        borderColor: 'DeepSkyBlue',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //fill: 'origin',
      },
      {
        data: [ ],
        label: this.label2,
        backgroundColor: 'SteelBlue',
        borderColor: 'SteelBlue',
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
        time:{ unit:'day' },
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
        enabled: true
      },
      legend: {
        display: true, //lines description 
        labels: {
        }
      },
      datalabels: {
        display: true,
        color: "black",
        align: 'top',
        padding: 0.5,
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && value) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label
            //console.log(value)
            return Number(value.y).toFixed(0);
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
    }

  };

  public lineChartType: ChartType = 'line';

  

  constructor() { 

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.chartData.datasets[0].label = this.label1;
    this.chartData.datasets[1].label = this.label2;
    this.chart?.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values1 = this.data.get(this.key1);
      let values2 = this.data.get(this.key2);

      if (values1 && values1.length > 0 && values2 && values2.length > 0) {

        let v1 = values1.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getTime()} });
        let v2 = values2.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getTime()} });

        this.chartData.datasets[0].data = v1;
        this.chartData.datasets[1].data = v2; 

        this.chart?.update();
     
      }
      else {
        this.chartData.datasets[0].data = [];
        this.chartData.datasets[1].data = [];
        this.chart?.update();      
      }
    }
  }

  createMap(key1:string, key2:string, data: Map<string, Value[]>) {

  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}

