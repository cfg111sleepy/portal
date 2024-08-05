import { Component, Input, OnInit } from '@angular/core';
import { Value } from '../../dashboards/gas-storage-map/gas-storage-map.models';


@Component({
  selector: 'app-small-table',
  templateUrl: './small-table.component.html',
  styleUrls: ['./small-table.component.scss']
})
export class SmallTableComponent implements OnInit {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
  

  constructor() { }

  ngOnInit(): void {
  }

  
}
