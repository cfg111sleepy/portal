import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-op-data1-line-chart',
  templateUrl: './op-data1-line-chart.component.html',
  styleUrls: ['./op-data1-line-chart.component.scss']
})
export class OpData1LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() key1 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() fixed = 3;  
  @Input() k = 1;  
  @Input() title = 'P';
 

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
        display: false,
      },
      y: { 
        display: true,           
      }
    },
    plugins: {
      title: {
        display: true,
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

        let v1 = values1.filter(v=>v.value !== undefined).map(v=> v.value*this.k);
        let l = values1.filter(v=> v.value).map(v=> new Date(v.time_stamp).toLocaleString().substring(0,17));
        this.lineChartData.datasets[0].data = v1;
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

