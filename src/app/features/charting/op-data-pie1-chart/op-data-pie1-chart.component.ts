import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-op-data-pie1-chart',
  templateUrl: './op-data-pie1-chart.component.html',
  styleUrls: ['./op-data-pie1-chart.component.scss']
})
export class OpDataPie1ChartComponent implements OnInit, OnChanges {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 3;  
  @Input() k = 0.000001;  
  @Input() dt = "";
  @Input() max = 30550000;
  @Input() title = 'Робочий обсяг (млн.м3)';
  @Input() param = 63;

  @Input() isDark = false;

  // Pie
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        align:"start"
      },
      
      datalabels: {
        display: true,
        color: "white",
        formatter: (value, ctx) => {
          //console.log(value, ctx);
          if (ctx.chart.data.labels && value && value > 0) {
            let label = ctx.chart.data.labels[ctx.dataIndex];  //return label 
            return value.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed}) + "\n" + label;
          }
          return ''
        }, 
        font: (ctx) => {
          return {
            weight: "bold",
            size: 16
          };
        }
      },

      title: {
        display: false,
        text: this.title
    }

    }
  };
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels:['замовлений', 'вільний'],
    datasets: [ { 
      data: [ ],
      backgroundColor:[
        'rgb(69, 149, 52)',
        'rgb(0, 82, 168)',        
        'DodgerBlue'
      ] 
    } ],    
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.chart?.render();
  }
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}.${this.param}`);
      if (values && values.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);

        let curr = values.find(v=> v.time_stamp.toString() == times[this.offset+1]);

        if(curr && curr.value) {
          let act = curr.value;
          let free = this.max - curr.value;
          //this.pieChartData.labels = [ 'зарезервовано', 'Робочий обсяг' ];
          this.pieChartData.datasets[0].data = [this.k *act, this.k *free];
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
    
    if (changes["isDark"] ) {
      this.chartChangeThema();
      this.chart?.update();
    }

  }

  selectPrevNextTimeStampes(dtIso: string) :string[] {
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

  chartChangeThema(): void {
    if(this.isDark) {
      this.pieChartData.datasets[0].backgroundColor = [
        'rgb(161, 180, 190)',
        'rgb(11, 187, 239)',        
        'DodgerBlue'
      ] 
    } else {
      this.pieChartData.datasets[0].backgroundColor = [
        'rgb(69, 149, 52)',
        'rgb(0, 82, 168)',        
        'DodgerBlue'
      ] 
    }
  } 

}
