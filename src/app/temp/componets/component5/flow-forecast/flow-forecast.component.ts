import { Component, OnInit, Input } from '@angular/core';
import { ForecastRow } from 'src/app/models/http';

@Component({
  selector: 'app-flow-forecast',
  templateUrl: './flow-forecast.component.html',
  styleUrls: ['./flow-forecast.component.scss']
})
export class FlowForecastComponent implements OnInit {
  constructor() { }
  
  @Input() rows: ForecastRow[] = [];
  @Input() totals?: ForecastRow;
  @Input() totals1?: ForecastRow;

  
  @Input() currentGasDay: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_1: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_2: Date = new Date("2023-01-01T07:00:00");
  @Input() gasDay_3: Date = new Date("2023-01-01T07:00:00");


  ngOnInit(): void {
  }

}
