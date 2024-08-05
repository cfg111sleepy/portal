import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as ra from '../../../state/range.actions';
import * as actions from '../../../state/opdata.actions';
import { NgbDatesRange } from '../../range/range.models';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../gas-storage-map/gas-storage-map.models';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../../state/range.actions';
import * as calendarSelectors from '../../../state/calendar.selectors'

@Component({
  selector: 'app-tov-regim-map',
  templateUrl: './tov-regim-map.component.html',
  styleUrls: ['./tov-regim-map.component.scss']
})
export class TovRegimMapComponent implements OnInit, OnDestroy {
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);
  
  D_2:string="";
  D_1:string="";
  D0:string="";
  D1:string="";
  D2:string="";

  iso:string="";

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
       
    this.iso = new Date(d.year, d.month-1, d.day).toISOString();

    let next = this.calendar.getNext(d);
    let prev = this.calendar.getPrev(d);
    let prev2 = this.calendar.getPrev(d, "d", 2);
    
    this.D_2 = `${prev2.day}.${prev2.month}.${prev2.year}`;
    this.D_1 = `${prev.day}.${prev.month}.${prev.year}`;
    this.D0 = `${d.day}.${d.month}.${d.year}`;
    this.D1 = `${next.day}.${next.month}.${next.year}`;

    this.loadData(d);

  });

  constructor(private store: Store, private calendar: NgbCalendar) { 
    
  }

  loadData(date: NgbDate): void {
    let rangeStart = this.calendar.getPrev(date, "d", 3);
    let rangeEnd = this.calendar.getNext(date, "d", 1);
    let range = {
      from: rangeStart,
      to: rangeEnd
    };
    this.store.dispatch(rangeActions.newDatesRange({ range}));

    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/2"}));
  }

  ngOnInit(): void {
  }

  onRangeChanged(event : NgbDatesRange): void {
    //console.log(event)
    this.store.dispatch(ra.newDatesRange({range: event}));
    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/2"}));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
