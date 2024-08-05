
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-op-data2-pie-chart',
  templateUrl: './op-data2-pie-chart.component.html',
  styleUrls: ['./op-data2-pie-chart.component.scss']
})
export class OpData2PieChartComponent implements OnInit, OnChanges {
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() key1 = "";
  @Input() key2 = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  @Input() offset = 0;
  @Input() fixed = 0;  
  @Input() k = 1;  
  @Input() dt = "";
  @Input() title = "";
  @Input() type = 'type1';

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
        align: 'end',
        anchor: 'end',
        offset: 3,
        padding: 0,
        formatter: (value, ctx) => {
          console.log(ctx);
          if (ctx.chart.data.labels && value && value > 0 && ctx.dataIndex==1) {
            //return ctx.chart.data.labels[ctx.dataIndex];  //return label 
            return value.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});
          }
          return ''
        }, 
        font: (ctx) => {
          return {
            weight: "bold",
            size: 30,
          };
        }
      },

      title: {
        display: true,
        text: this.title
    }

    }
  };
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels:['загально', 'кількість зп в добі'],
    datasets: [ { 
      data: [ ],
      backgroundColor:[
        'SteelBlue',
        'DarkGrey',        
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
    if (this.chart?.options?.plugins?.title) this.chart.options.plugins.title.text = this.title;
    this.chartChangeThema();    
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
      let values1 = this.data.get(`${this.key1}`);
      let values2 = this.data.get(`${this.key2}`);

      //console.log(values1)

      if (values1 && values1.length > 0 && values2 && values2.length > 0) {
        let times = this.selectPrevNextTimeStampes(this.dt);
        //console.log(times)
        let curr1 = values1.find(v=> v.time_stamp.toString() == times[this.offset+1]);
        let curr2 = values2.find(v=> v.time_stamp.toString() == times[this.offset+1]);
        
        //console.log(curr1)

        //if(curr1 && curr1.value && curr2 && curr2.value) {
          if(curr1  && curr2 ) {
          let par1 = curr1.value;
          let par2 = curr2.value;
          this.pieChartData.datasets[0].data = [this.k *par1, this.k *par2];
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
      this.chart?.render();
    }
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
  
  chartChangeThema(): void {
    if(this.isDark) {
      let accentColor = this.type == "type1" ? "rgb(146,208,80)" : "rgb(255, 215, 68)";
      this.pieChartData.datasets[0].backgroundColor = [
        'rgb(161, 180, 190)',
        accentColor,        
        'DodgerBlue'
      ] 
      if (this.chart?.options?.plugins?.title) this.chart.options.plugins.title.color = "white";
      if (this.chart?.options?.plugins?.datalabels?.color) this.chart.options.plugins.datalabels.color = accentColor;

    } else {
      let accentColor = this.type == "type1" ? "rgb(69, 149, 52)" : "rgb(155, 23, 45)";
      this.pieChartData.datasets[0].backgroundColor = [
        'rgb(161, 180, 190)',
        accentColor,        
        'DodgerBlue'
      ] 
      if (this.chart?.options?.plugins?.title) this.chart.options.plugins.title.color = "black";
      if (this.chart?.options?.plugins?.datalabels?.color) this.chart.options.plugins.datalabels.color = accentColor;
    }
  } 

}
