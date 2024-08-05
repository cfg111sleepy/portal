import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as ra from '../../../state/range.actions';
import * as actions from '../../../state/opdata.actions';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../gas-storage-map/gas-storage-map.models';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../../state/range.actions';
import * as calendarSelectors from '../../../state/calendar.selectors';
import { navigateTo } from '../../../state/navigation.actions';
import * as themaSelectors from '../../../state/theme.selectors';

import { interval } from 'rxjs';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-commerse',
  templateUrl: './commerse.component.html',
  styleUrls: ['./commerse.component.scss']
})
export class CommerseComponent implements OnInit, AfterViewInit {
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);
  isDark$ = this.store.select(themaSelectors.selectIsDark);
  
  constructor(private store: Store, private calendar: NgbCalendar) { }
  
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  seconds = interval(1000);

  leftRenom = 24;

  iso="";

  isDark = false;

  currDay?: NgbDate;

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.iso = new Date(d.year, d.month-1, d.day).toISOString();     
    this.loadData(d);
  });

  sub3 = this.seconds.subscribe(val => {
    let nowHH = new Date().getHours();
    if(nowHH < 7) {
      if(nowHH < 4) {
        this.leftRenom = 4 - nowHH
      } else {
        this.leftRenom = 0;
      } 
    } else {
      this.leftRenom = 24 - nowHH + 4;
    }

  });

  sub4 = this.isDark$.subscribe(map=> {
    this.isDark = map;
  });

  ngOnInit(): void {
    console.log("init")
    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if(this.currDay) {
        this.loadData(this.currDay)
        console.log("after timeout")
      }  
     }, 5000);
    //clearTimeout(timer);    
  }

  ngAfterViewInit(): void {

  } 

  loadData(date: NgbDate): void {
    let rangeStart = this.calendar.getPrev(date, "d", 10);
    let rangeEnd = this.calendar.getNext(date, "d", 1);
    let range = {
      from: rangeStart,
      to: rangeEnd
    };
    this.store.dispatch(rangeActions.newDatesRange({ range}));
    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/3"}));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }
  onNavigate(url:string, params: NavigationExtras) {
    this.store.dispatch(navigateTo({ url, params }));
  }
}
