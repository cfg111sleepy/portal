import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType, ChartTypeRegistry, DefaultDataPoint } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
import 'chartjs-adapter-date-fns';
import {uk} from 'date-fns/locale';
import { bottom } from '@popperjs/core';

@Component({
  selector: 'app-op-data3-line-chart',
  templateUrl: './op-data3-line-chart.component.html',
  styleUrls: ['./op-data3-line-chart.component.scss']
})
export class OpData3LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key1 = "";
  @Input() key2 = "";
  @Input() key3 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() label1 = 'P';
  @Input() label2 = 'P';
  @Input() label3 = 'P';

  @Input() yAxisID1 = 'y-axis-0';
  @Input() yAxisID2 = 'y-axis-0';
  @Input() yAxisID3 = 'y-axis-0';

  @Input() title = '';
  @Input() isDark = false;

  public chartData: ChartConfiguration['data'] = {
    datasets: [
 
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
        display:false,
        type:'time',
        time:{ unit:'day' },
        adapters:{ 
          date: {
            locale: uk
          }}
      },
      'y-axis-0':
      {
        type: 'linear',
        display: false,
        position: 'left',
        grid: {
          drawOnChartArea: true, 
        }
      },
      'y-axis-1':
      {
        type: 'linear',
        display: false,
        position: 'right',
        grid: {
          drawOnChartArea: true, 
        }
      },
      'y-axis-2':
      {
        type: 'linear',
        display: false,
        position: 'left',
        grid: {
          drawOnChartArea: true, 
        }
      },
    },
    plugins: {
      title: {
        display: false,  //название графика всего !!!
        text: this.title
      },
      tooltip:{
        enabled: true
      },
      legend: {
        display: true, //lines description
        position: bottom, 
        labels: {
          color : "black"
        }
      },
      datalabels: {
        display: false,
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
    }

  };

  public lineChartType: ChartType = 'line';

  

  constructor() { 

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  
  chartInit(): void {

    if (this.key1) {
      this.chartData.datasets[0]  = {
        data: [ ],
        label: this.label1,
        backgroundColor: 'rgb(0,89,168)',
        borderColor: 'rgb(0,89,168)',
        pointBackgroundColor: 'rgb(0,89,168)',
        pointBorderColor: 'rgb(0,89,168)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //fill: 'origin',
        yAxisID : this.yAxisID1
      }
    } else {
      this.chartData.datasets[0]  = {
        data: [ ], 
        label: "",
        hidden: true,
        backgroundColor: 'rgb(199,209,216)',
        borderColor: 'rgb(199,209,216)',
        }
    }
    if (this.key2) {
      this.chartData.datasets[1] = {
      data: [ ],
      label: this.label2,
      backgroundColor: 'rgb(69,149,52)',
      borderColor: 'rgb(69,149,52)',
      pointBackgroundColor: 'rgb(69,149,52)',
      pointBorderColor: 'rgb(69,149,52)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      yAxisID : this.yAxisID2
      //fill: 'origin',
    }
  } else {
    this.chartData.datasets[1]  = {
      data: [ ],
      label: "",
      hidden: true,
      backgroundColor: 'rgb(199,209,216)',
      borderColor: 'rgb(199,209,216)',
    }
  }
  if (this.key3) {
    this.chartData.datasets[2] = {
      data: [ ],
      label: this.label3,
      backgroundColor: 'rgb(155,23,45)',
      borderColor: 'rgb(155,23,45)',
      pointBackgroundColor: 'rgb(155,23,45)',
      pointBorderColor: 'rgb(155,23,45)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      yAxisID : this.yAxisID3
      //fill: 'origin',
    }
  } else {
    this.chartData.datasets[2]  = {
      data: [ ],
      label: "",
      hidden: true,
      backgroundColor: 'rgb(199,209,216)',
      borderColor: 'rgb(199,209,216)',
    }
  }
     this.chart?.render();
  }

  chartChangeThema(): void {
    
      if (!this.chart) return;

      if (!this.isDark) {

        if (this.chartOptions && this.chartOptions.plugins && this.chartOptions.plugins.legend && this.chartOptions.plugins.legend.labels) {
          this.chartOptions.plugins.legend.labels.color = "black";
        }
        
        if (this.key1) {
          this.chartData.datasets[0].backgroundColor =  'rgb(0,89,168)';
          this.chartData.datasets[0].borderColor =  'rgb(0,89,168)';
          this.chartData.datasets[0] = Object.assign(this.chartData.datasets[0], { ['pointBackgroundColor']: 'rgb(0,89,168)', ['pointBorderColor']: 'rgb(0,89,168)' });          
        }
        if (this.key2) {
          this.chartData.datasets[1].backgroundColor =  'rgb(69,149,52)';
          this.chartData.datasets[1].borderColor =  'rgb(69,149,52)';
          this.chartData.datasets[1] = Object.assign(this.chartData.datasets[1], { ['pointBackgroundColor']: 'rgb(69,149,52)', ['pointBorderColor']: 'rgb(69,149,52)' });  
        }
        if (this.key3) {
          this.chartData.datasets[2].backgroundColor =  'rgb(155,23,45)';
          this.chartData.datasets[2].borderColor =  'rgb(155,23,45)';
          this.chartData.datasets[2] = Object.assign(this.chartData.datasets[2], { ['pointBackgroundColor']: 'rgb(155,23,45)', ['pointBorderColor']: 'rgb(155,23,45)' });  
        }

      } else {

        if (this.chartOptions && this.chartOptions.plugins && this.chartOptions.plugins.legend && this.chartOptions.plugins.legend.labels) {
          this.chartOptions.plugins.legend.labels.color = "white";
        }

        if (this.key1) {
          this.chartData.datasets[0].backgroundColor =  'rgb(11,187,239)';
          this.chartData.datasets[0].borderColor =  'rgb(11,187,239)';
          this.chartData.datasets[0] = Object.assign(this.chartData.datasets[0], { ['pointBackgroundColor']: 'rgb(11,187,239)', ['pointBorderColor']: 'rgb(11,187,239)' });  
        }
        if (this.key2) {
          this.chartData.datasets[1].backgroundColor =  'rgb(146,208,80)';
          this.chartData.datasets[1].borderColor =  'rgb(146,208,80)';
          this.chartData.datasets[1] = Object.assign(this.chartData.datasets[1], { ['pointBackgroundColor']: 'rgb(146,208,80)', ['pointBorderColor']: 'rgb(146,208,80)' });  
        }
        if (this.key3) {
          this.chartData.datasets[2].backgroundColor =  'rgb(255,215,68)';
          this.chartData.datasets[2].borderColor =  'rgb(255,215,68)';
          this.chartData.datasets[2] = Object.assign(this.chartData.datasets[2], { ['pointBackgroundColor']: 'rgb(255,215,68)', ['pointBorderColor']: 'rgb(255,215,68)' });  
        }
      } 
      this.chart?.render();  
  }

  ngAfterViewInit(): void {
    if (this.chart) this.chartInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data && this.chart && this.chart.data && this.chart.data.datasets.length > 0) {

      let values1 = this.data.get(this.key1);
      let values2 = this.data.get(this.key2);
      let values3 = this.data.get(this.key3);

      if (values1 && values1.length > 0) {
        let v1 = values1.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getTime()} });
        this.chartData.datasets[0].data = v1;
      }
      else {
        //this.chartData.datasets[0].data = [];
      }

      if (values2 && values2.length > 0) {
        let v2 = values2.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getTime()} });
        this.chartData.datasets[1].data = v2;      
      }
      else {
        //this.chartData.datasets[1].data = [];
      }

      if (values3 && values3.length > 0 ) {
        let v3 = values3.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getTime()} });
        this.chartData.datasets[2].data = v3;
      }
      else {
        //this.chartData.datasets[2].data = [];
      }

      this.chart?.update();
    }
    if (changes["isDark"] ) {
      this.chartChangeThema();
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

