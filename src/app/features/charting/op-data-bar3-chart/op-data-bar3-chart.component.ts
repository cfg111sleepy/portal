
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
import 'chartjs-adapter-date-fns';
import {uk} from 'date-fns/locale';
import { bottom } from '@popperjs/core';

@Component({
  selector: 'app-op-data-bar3-chart',
  templateUrl: './op-data-bar3-chart.component.html',
  styleUrls: ['./op-data-bar3-chart.component.scss']
})
export class OpDataBar3ChartComponent implements OnInit, OnChanges, OnDestroy {

  public chartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() dt = "";
  @Input() offset = 0;

  @Input() key1 = "";
  @Input() key2 = "";
  @Input() key3 = "";

  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() label1 = 'P';
  @Input() label2 = 'P';
  @Input() label3 = 'P';
  @Input() ylabel = 'газосховище';

  @Input() title = '';
  @Input() isDark = false;

  public chartData: ChartConfiguration['data'] = {
    labels: [this.ylabel],
    datasets: [
 
    ],
    //labels: [ ],    
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    indexAxis: 'y',

    scales: {
      x: {
        display: false, 
      },
      'yAxe-0': {
          display: true,          
          title : {
          },
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
        display: false, //lines description
        position: bottom, 
        labels: {
          color : "black"
        }
      },
      datalabels: {
        display: true,
        color: "white",
        align: 'right',
        padding: 0.5,
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && value) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label
            //console.log(value)
            return  Number(value).toLocaleString("fr-CA", {minimumFractionDigits: this.fixed}) //
          }
          return '';
        }, 
        font: (ctx) => {
          return {
            weight:"bold",
            size: 14,            
          };
        }
      },
    }

  };



  

  constructor() { 

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  
  chartInit(): void {
    this.chartData.labels = [this.ylabel];
    if (this.key1) {
      this.chartData.datasets[0]  = {
        data: [ ],
        label: this.label1,
        backgroundColor: 'rgb(0,89,168)',
        borderColor: 'rgb(0,89,168)',
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
        }
        if (this.key2) {
          this.chartData.datasets[1].backgroundColor =  'rgb(69,149,52)';
          this.chartData.datasets[1].borderColor =  'rgb(69,149,52)';
        }
        if (this.key3) {
          this.chartData.datasets[2].backgroundColor =  'rgb(155,23,45)';
          this.chartData.datasets[2].borderColor =  'rgb(155,23,45)';
        }

      } else {

        if (this.chartOptions && this.chartOptions.plugins && this.chartOptions.plugins.legend && this.chartOptions.plugins.legend.labels) {
          this.chartOptions.plugins.legend.labels.color = "white";
        }

        if (this.key1) {
          this.chartData.datasets[0].backgroundColor =  'rgb(11,187,239)';
          this.chartData.datasets[0].borderColor =  'rgb(11,187,239)';
        }
        if (this.key2) {
          this.chartData.datasets[1].backgroundColor =  'rgb(146,208,80)';
          this.chartData.datasets[1].borderColor =  'rgb(146,208,80)';
        }
        if (this.key3) {
          this.chartData.datasets[2].backgroundColor =  'rgb(255,215,68)';
          this.chartData.datasets[2].borderColor =  'rgb(255,215,68)';
        }
      } 
      this.chart?.render();  
  }

  ngAfterViewInit(): void {
    this.chartInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data && this.chart && this.chart.data && this.chart.data.datasets.length > 0) {

      let values1 = this.data.get(this.key1);
      let values2 = this.data.get(this.key2);
      let values3 = this.data.get(this.key3);
      
      let times = this.selectPrevNextTimeStampes(this.dt);

      if (values1 && values1.length > 0) {
        
        //console.log(times)
        let curr1 = values1.find(v=> v.time_stamp.toString() == times[this.offset+1]);

        if (curr1) {
          this.chartData.datasets[0].data = [curr1.value*this.k];
        }        
      }
      if (values2 && values2.length > 0) {

        //console.log(times)
        let curr2 = values2.find(v=> v.time_stamp.toString() == times[this.offset+1]);

        if (curr2) {
          this.chartData.datasets[1].data = [curr2.value*this.k];
        }        
      }
      if (values3 && values3.length > 0) {

        //console.log(times)
        let curr3 = values3.find(v=> v.time_stamp.toString() == times[this.offset+1]);

        if (curr3) {
          this.chartData.datasets[2].data = [curr3.value*this.k];
        }        
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
  selectPrevNextTimeStampes(dtIso:string) :string[] {
    //console.log(dtIso);
    if (!dtIso) return [];
    let d1 = new Date(dtIso);    
    d1.setHours(7);    
    let d0 = new Date(dtIso);    
    d0.setHours(7);
    d0.setDate(d0.getDate()-1);
    let d2 = new Date(dtIso);
    d2.setHours(7);    
    d2.setDate(d2.getDate()+1);
    //console.log(d0.toISOString(), d1.toISOString(), d2.toISOString())
    return [d0.toISOString(), d1.toISOString(), d2.toISOString()];
  }
}


