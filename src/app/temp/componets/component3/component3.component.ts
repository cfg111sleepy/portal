import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as ra from '../../../state/range.actions';
import * as actions from '../../../state/opdata.actions';
import { NgbDatesRange, NgbDatesRangeIso } from '../../../features/range/range.models';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../../../features/dashboards/gas-storage-map/gas-storage-map.models';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../../state/range.actions';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);         //
  datesRange$ = this.store.select(selectors.selectDatesOnlyRange);

  datesRange : NgbDatesRangeIso = {from:"", to:""};

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.datesRange$.subscribe(r=> {
    this.datesRange = r;
  });

  constructor(private store: Store, private calendar: NgbCalendar) { 
    
  }

  ngOnInit(): void {

    let date = this.calendar.getToday();
    let rangeStart = this.calendar.getPrev(date, "d", 1);
    let rangeEnd = this.calendar.getNext(date, "d", 1);
    let range = {
      from: rangeStart,
      to: rangeEnd
    };

    //set init range selector
    this.store.dispatch(rangeActions.newDatesRange({ range}));

    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/4", from: this.datesRange.from +"T07:00:00", to: this.datesRange.to +"T07:00:00"}));
  }

  onRangeChanged(event : NgbDatesRange): void {
    //console.log(event)
    this.store.dispatch(ra.newDatesRange({range: event}));
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/4", from: this.datesRange.from +"T07:00:00", to: this.datesRange.to +"T07:00:00"}));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
