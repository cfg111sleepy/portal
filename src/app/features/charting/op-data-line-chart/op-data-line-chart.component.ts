import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-op-data-line-chart',
  templateUrl: './op-data-line-chart.component.html',
  styleUrls: ['./op-data-line-chart.component.scss']
})
export class OpDataLineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  
  @Input() fixed = 3;  
  @Input() k = 0.001;  

  @Input() title = 'ПСГ';

 

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
        pointRadius: 1,

        fill: 'origin',
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
      tooltip:{
        enabled: true
      },
      legend:{
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
    this.lineChartData.datasets[0].label = this.title;
    //this.chart?.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values = this.data.get(this.key);

      if (values && values.length > 0) {

        let v = values.map(v=> v.value*this.k);
        let l = values.map(v=> v.time_stamp.toString().substring(0,10) );

        this.lineChartData.datasets[0].data = v;
        this.lineChartData.labels =l;
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
