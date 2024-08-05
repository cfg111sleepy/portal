import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../state/range.selectors';
import * as ra from '../../state/range.actions';
import * as actions from '../../state/opdata.actions';
import { NgbDatesRange } from '../range/range.models';
import * as opDataSelectors from '../../state/opdata.selectors'
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../state/range.actions';
import { Value } from '../dashboards/gas-storage-map/gas-storage-map.models';
import { interval } from 'rxjs';
import * as calendarSelectors from '../../state/calendar.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  iso:string="";

  seconds = interval(1000);

  leftRenom = 24;

  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  select7_10$ = this.store.select(calendarSelectors.select7_10CurrentDay);
  select7_10 : boolean = false;

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.select7_10$.subscribe(s=> {
    this.select7_10 = s;
  });

  sub3 = this.seconds.subscribe(val => {
    let nowHH = new Date().getHours();
    if(nowHH < 7) {
        this.leftRenom = 7 - nowHH
    } else {
      this.leftRenom = 24 - nowHH + 7;
    }

  });

  sub4 = this.currDay$.subscribe(d=> {
    this.clickSelectDay(d);
    this.iso = new Date(d.year, d.month-1, d.day).toISOString();  
  });

  constructor(private store: Store, private calendar: NgbCalendar) { 
    
  }

  ngOnInit(): void {
    let today = this.calendar.getToday();
    this.clickSelectDay(today);  
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

  clickSelectDay(d: NgbDate): void {
		//console.log("Date selection changed ", date)
    let from = new Date(d.year, d.month-1, d.day, 7,0,0,0);
    let to = new Date(d.year, d.month-1, d.day, 7,0,0,0);
    to.setDate(to.getDate()+1);
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/7", from: from.toISOString(), to: to.toISOString()}));
	}
  
}

