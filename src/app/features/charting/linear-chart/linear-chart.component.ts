import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit, OnChanges {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 3;  
  @Input() k = 0.000001;  
  @Input() dt = "";
  @Input() max = 30550000;
  @Input() title = 'ПСГ';


  act_parameter = "52";
  long_parameter = "352";

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align:"start"
      },
      
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels && value > 0) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
            return value.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
          }
          return ''
        }, 
        font: (ctx) => {
          return {
            weight:"bold",
            size:16
          };
        },
        color: 'White'
      },

      title: {
        display: true,
        //text: this.title
    }

    }
  };
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Техн-активний', 'Необоротний', 'Вільно' ],
    datasets: [ {
      data: [ ],
      backgroundColor:[
        '#0bbbef',
        '#a1b4be',
        '#0063af',
        
      ]
    } ],
    
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor() { }

  ngOnInit(): void {
    if (this.pieChartOptions && this.pieChartOptions && this.pieChartOptions.plugins && this.pieChartOptions.plugins.title){
      this.pieChartOptions.plugins.title.text= this.title;
    } 
    this.chart?.render();
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {

      let values = this.data.get(`${this.key}.${this.act_parameter}`);
      let longs = this.data.get(`${this.key}.${this.long_parameter}`);

      if (values && values.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);

        let curr = values.find(v=> v.time_stamp.toString() == times[this.offset+1]);
        let par352 = longs?.find(v=> v.time_stamp.toString() == times[this.offset+1]);

        if(curr && curr.value) {
          let act = curr.value;
          let long = (par352 && par352.value) ? par352.value : 0;
          let free = this.max - curr.value - long;

          this.pieChartData.datasets[0].data = [this.k *act, this.k *long, this.k *free];
          //console.log(this.data)
        } else {
          this.pieChartData.datasets[0].data = [];
        }
     
      }
      else {
        this.pieChartData.datasets[0].data = []; 
      }
      this.chart?.update();
    }
  }

  selectPrevNextTimeStampes(dtIso:string) :string[] {
    //console.log(dtIso);
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
