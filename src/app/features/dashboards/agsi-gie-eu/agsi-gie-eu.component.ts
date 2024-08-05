import { Component, OnDestroy, OnInit } from '@angular/core';
import * as calendarSelectors from '../../../state/calendar.selectors'
import * as agsiSelectors from '../../../state/agsi.selectors'
import * as agsiActions from '../../../state/agsi.actions'
import { Store } from '@ngrx/store';
import { AgsiDayData } from './agsi-gie-eu.models';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatesRange } from '../../range/range.models';


@Component({
  selector: 'app-agsi-gie-eu',
  templateUrl: './agsi-gie-eu.component.html',
  styleUrls: ['./agsi-gie-eu.component.scss']
})
export class AgsiGieEuComponent implements OnInit, OnDestroy {

  constructor(private store: Store,private modalService: NgbModal,private calendar: NgbCalendar) { }  
  
  METER_TO_WT = 10.56;

  currDay$ = this.store.select(calendarSelectors.selectedDateSttring);

  currEUDayData$ = this.store.select(agsiSelectors.selectedEUDay);//selectedEUDay
  currNonEUDayData$ = this.store.select(agsiSelectors.selectNonEUDay);//NonEU

  currEUDayDataLastY$ = this.store.select(agsiSelectors.selectedEUDayLastY);//selectedEUDay
  currNonEUDayDataLastY$ = this.store.select(agsiSelectors.selectNonEUDayLastY);//NonEU

  history$ = this.store.select(agsiSelectors.selectHistory);//history

  codeCountrySelected : string = "";

  data?: AgsiDayData;
  data1?: AgsiDayData;

  data2?: AgsiDayData;
  data3?: AgsiDayData;
  data4: AgsiDayData[] = [];

  from: string = "2024-01-01";
  to: string = "2024-02-01";

  displayM = true;

  sub1 = this.currDay$.subscribe(d=> {
    //console.log(d);
    this.store.dispatch(agsiActions.getGasDay({date:d})); 
    this.store.dispatch(agsiActions.getGasDayLastYear({date:d})); 
  });
  
  sub2 = this.currEUDayData$.subscribe(d=> {
    this.data = d;
  });

  sub3 = this.currNonEUDayData$.subscribe(d=> {
    this.data1 = d;
  });

  sub4 = this.currEUDayDataLastY$.subscribe(d=> {
    this.data2 = d;
  });

  sub5 = this.currNonEUDayDataLastY$.subscribe(d=> {
    this.data3 = d;
  });

  sub6 = this.history$.subscribe(d=> {
    if (d) {
      let temp = [...d.data];
      temp.sort((a, b) => a.gasDayStart.toString().localeCompare(b.gasDayStart.toString()));
      if (this.displayM) {
        let metters = temp.map(v => {
          let m = Number(v.gasInStorage) / this.METER_TO_WT;
          return {...v, gasInStorage: m.toFixed(3)};
        });
        this.data4 = metters;  
        return;
      }
      this.data4 = temp;
      console.log(this.data4)  
    }
  });

  ngOnInit(): void {
    let to = this.calendar.getPrev(this.calendar.getToday(), 'd', 0);      
    let from = this.calendar.getPrev(this.calendar.getToday(), 'd', 31);

    this.to = new Date(to.year, to.month - 1, to.day).toISOString().substring(0,10);
    this.from = new Date(from.year, from.month - 1, from.day).toISOString().substring(0,10);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
    this.sub6.unsubscribe();
  }

  toggleT(state: boolean) {
    this.displayM = state;
  }

  clickCountry(longContent: any, code: string)  {
    //console.log(code)
    this.data4 = [];
    this.codeCountrySelected = code;
    this.store.dispatch(agsiActions.getHist({from: this.from, to: this.to, code: code})); 
    this.modalService.open(longContent, { scrollable: true });
  }

  trendRangeChanged(range: NgbDatesRange) {
    //console.log(range);
    this.data4 = [];
    let to = new Date(range.to.year, range.to.month - 1, range.to.day).toISOString().substring(0,10);
    let from = new Date(range.from.year, range.from.month - 1, range.from.day).toISOString().substring(0,10);
    this.store.dispatch(agsiActions.getHist({from: from, to: to, code: this.codeCountrySelected})); 
  }

}
