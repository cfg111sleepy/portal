
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/temperature-map/temperature-map.models';


@Component({
  selector: 'app-forecast-city-line',
  templateUrl: './forecast-city-line.component.html',
  styleUrls: ['./forecast-city-line.component.scss']
})
export class ForecastCityLineComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() key = 0;
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() title = "";

  @Output() exported: EventEmitter<number> = new EventEmitter<number>();
  
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
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
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

  ngOnInit(): void {
    this.lineChartData.datasets[0].label = this.title;
    this.chart?.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values = this.selectLineData(this.key, 3, this.data);

      if (values && values.length > 0) {
        let v = values.map(v=> v.value);
        let l = values.map(v=> new Date(v.time_stamp).getDate());

        this.lineChartData.datasets[0].data = v;
        this.lineChartData.labels =l;
        this.chart?.update();
     
      }
      else {
         
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


  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  selectLineData(location_id: number, param:number, map : Map<string, Value[]>) : Value[] {
    let res: Value[] = [];
    let v = map.get(`${location_id}`);
    if (!v) return res;
    return v.filter(v=> v.parameter == param);
  }

  export() {
    this.exported.emit(this.key);
  }
}

