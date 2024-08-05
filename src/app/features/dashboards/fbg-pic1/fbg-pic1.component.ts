import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as statActions from '../../../state/stat.actions';
import * as actions from '../../../state/opdata.actions';
import { NgbDatesRangeIso } from '../../../features/range/range.models';
import * as opDataSelectors from '../../../state/opdata.selectors'
import * as statSelectors from '../../../state/stat.selectors'
import { Value, StatValue } from '../../../features/dashboards/gas-storage-map/gas-storage-map.models';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fbg-pic1',
  templateUrl: './fbg-pic1.component.html',
  styleUrls: ['./fbg-pic1.component.scss']
})
export class FbgPic1Component implements OnInit, OnDestroy {

  statDataMap$ = this.store.select(statSelectors.selectStatDataMap);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);         //
  datesRange$ = this.store.select(selectors.selectDatesOnlyRange);

  datesRange : NgbDatesRangeIso = {from:"", to:""};
  startYRange : NgbDatesRangeIso = {from:"", to:""};

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();
  statDataMap : Map<string, StatValue> =  new Map<string, StatValue>();

  selectedYear = new Date().getFullYear().toFixed(0);
  selectedMonth = new Date().getMonth().toFixed(0);

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.statDataMap$.subscribe(map=> {
    this.statDataMap  = map;
  });


  constructor(private store: Store, private calendar: NgbCalendar) { 
    
  }

  dispatchLoladStat(): void {
    this.store.dispatch(statActions.loadTable({objects: [16006004,16006007,6103006,6080582,6090539,7040100,1093146,1091135,1100434,2110317,2110441,2110489,6102134, 16103100, 11091091, 12110242,16103047, 16103046,
      907020,907040,907010,9800539,
      1907020,1907040,1907010,19800539
    ], parameters:[63], from: this.startYRange.from, to: this.startYRange.to}));  
  }

  ngOnInit(): void {
    this.datesRange = this.getMonthRange(this.selectedYear, this.selectedMonth);
    this.startYRange = this.getFromStartYearRange(this.selectedYear, this.selectedMonth);
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/5", from: this.datesRange.from, to: this.datesRange.to}));
    this.dispatchLoladStat();  
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  yearChanged(e: Event) {
    this.datesRange = this.getMonthRange(this.selectedYear, this.selectedMonth);
    this.startYRange = this.getFromStartYearRange(this.selectedYear, this.selectedMonth);
    //console.log(this.datesRange);
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/5", from: this.datesRange.from, to: this.datesRange.to}));
    this.dispatchLoladStat();
  }

  monthChanged(e: Event) {
    this.datesRange = this.getMonthRange(this.selectedYear, this.selectedMonth);
    this.startYRange = this.getFromStartYearRange(this.selectedYear, this.selectedMonth);
    //console.log(this.datesRange);
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/5", from: this.datesRange.from, to: this.datesRange.to}));
    this.dispatchLoladStat();
  }

  getMonthRange(year:string, month:string): NgbDatesRangeIso {
    let from = new Date(+year, +month, 1, 7);
    let to = new Date(+year, +month, 1, 7);
    to.setMonth(to.getMonth()+1);
    to.setDate(to.getDate() - 1);
    return {from: from.toISOString(), to: to.toISOString()};
  }

  getFromStartYearRange(year:string, month:string): NgbDatesRangeIso {
    let from = new Date(+year, 0, 1, 7);
    let to = new Date(+year, +month, 1, 7);
    to.setMonth(to.getMonth()+1);
    to.setDate(to.getDate() - 1);
    return {from: from.toISOString(), to: to.toISOString()};
  }


}

