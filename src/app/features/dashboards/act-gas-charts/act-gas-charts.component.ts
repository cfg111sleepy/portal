import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as ra from '../../../state/range.actions';
import * as actions from '../../../state/opdata.actions';
import { NgbDatesRange } from '../../range/range.models';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../gas-storage-map/gas-storage-map.models';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../../state/range.actions';

@Component({
  selector: 'app-act-gas-charts',
  templateUrl: './act-gas-charts.component.html',
  styleUrls: ['./act-gas-charts.component.scss']
})
export class ActGasChartsComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  constructor(private store: Store, private calendar: NgbCalendar) { 
    
  }

  ngOnInit(): void {

    let date = this.calendar.getToday();
    let rangeStart = this.calendar.getPrev(date, "m", 3);
    let rangeEnd = this.calendar.getNext(date, "d", 1);
    let range = {
      from: rangeStart,
      to: rangeEnd
    };
    this.store.dispatch(rangeActions.newDatesRange({ range}));

    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/1"}));
  }

  onRangeChanged(event : NgbDatesRange): void {
    //console.log(event)
    this.store.dispatch(ra.newDatesRange({range: event}));
    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/1"}));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

}