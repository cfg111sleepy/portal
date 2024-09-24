import { Component, OnInit, Input } from '@angular/core';
import { ForecastRow } from 'src/app/models/http';

@Component({
  selector: 'app-flow-forecast-dd',
  templateUrl: './flow-forecast-dd.component.html',
  styleUrls: ['./flow-forecast-dd.component.scss']
})
export class FlowForecastDdComponent implements OnInit {

  constructor() { }
  
  data = [
    { color: '#00CFFF', day: 1 },  // 1-й день (блакитний)
    { color: '#005D9C', day: 2 },  // 2-й день (темно-синій)
    { color: '#FF9E6B', day: 3 },  // 3-й день (оранжевий)
    { color: '#6FB2B5', day: 4 },  // 4-й день (світло-зелений)
    { color: '#9A1E2C', day: 5 },  // 5-й день (темно-червоний)
    { color: '#343436', day: 6 },  // 6-й день (чорний)
    { color: '#F5D544', day: 7 },  // 7-й день (жовтий)
    { color: '#529452', day: 8 }   // 8-й день (зелений)
  ];

  @Input() rows: ForecastRow[] = [];
  @Input() totals?: ForecastRow;
  @Input() totals1?: ForecastRow;

  
  @Input() currentGasDay: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_1: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_2: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_3: Date = new Date("2023-01-01T07:00:00");

  today: Date = new Date();

  addDays(days: number): string {
    let result = new Date(this.today);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
  }

  ngOnInit(): void {
  }

}
