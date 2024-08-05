import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as selectors from '../../../state/range.selectors';

import * as weatherActions from '../../../state/temperatures.actions'
import * as weatherSelectors from '../../../state/temperatures.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import { Value } from '../temperature-map/temperature-map.models';
 

@Component({
  selector: 'app-temperatures-charts',
  templateUrl: './temperatures-charts.component.html',
  styleUrls: ['./temperatures-charts.component.scss']
})
export class TemperaturesChartsComponent  implements OnInit, OnDestroy {
  dataMap$ = this.store.select(weatherSelectors.selectWheatherMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDateIso);
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();
  range$ = this.store.select(selectors.selectDatesRange);

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;

  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(weatherActions.loadApidata());
 
  });

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }


  
}
