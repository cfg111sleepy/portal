import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';
import {uk} from 'date-fns/locale';

@Component({
  selector: 'app-op-data-line1-chart-days-x',
  templateUrl: './op-data-line1-chart-days-x.component.html',
  styleUrls: ['./op-data-line1-chart-days-x.component.scss']
})
export class OpDataLine1ChartDaysXComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key1 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() title = '';
 

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ ],
        label: this.title,
        backgroundColor: 'rgb(0,89,168)',
        borderColor: 'rgb(0,89,168)',
        pointBackgroundColor: 'rgb(0,89,168)',
        pointBorderColor: 'rgb(0,89,168)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        //fill: 'origin',
        borderWidth: 1,
        pointRadius: 2,
      },

    ],
    labels: [ ],
    
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.2
      },
      
    },    
    scales: {
      x: {
        title: { 
          //display: true,
          //text:"дата"
        },
        type:'linear',
        min:1,
        max:31,
        //time:{ unit:'day' },
        //adapters:{ 
        //  date: {
        //    locale: uk
        //  }},
        ticks: {
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function(val, index) {
            // Hide every 2nd tick label
            //return index % 2 === 0 ? this.getLabelForValue(val) : '';
            //console.log(index, val)
            return val;
          },
          color: 'black',
        }
      },
      y: { 
        display: true,           
      }
    },
    plugins: {
      title: {
        display: false,
        text: this.title,
      },
      tooltip:{
        enabled: true
      },
      legend: {
        display: false, //lines description 
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

  public lineChartType: ChartType = 'line';

  

  constructor() { 

  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.lineChartOptions) {
      if (this.lineChartOptions.plugins) {
        if (this.lineChartOptions.plugins.title) {
          this.lineChartOptions.plugins.title.text = this.title;
          this.chart?.render();
        }
      }     
    }

    this.chart?.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values1 = this.data.get(this.key1);

      if (values1 && values1.length > 0) {
        let v1 = values1.map(v=> { return { y: v.value*this.k, x: new Date(v.time_stamp).getDate()} });
        this.lineChartData.datasets[0].data = v1;
        this.chart?.update();    
      }
      else {
        this.lineChartData.datasets[0].data = [];
        this.lineChartData.labels =[];
        this.chart?.update();      
      }
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

