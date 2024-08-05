
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../../state/opdata.actions';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../gas-storage-map/gas-storage-map.models';
import * as calendarSelectors from '../../../state/calendar.selectors'
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tov-regim-map1',
  templateUrl: './tov-regim-map1.component.html',
  styleUrls: ['./tov-regim-map1.component.scss']
})
export class TovRegimMap1Component implements OnInit, OnDestroy {

  constructor(private store: Store, private modalService: NgbModal, private calendar: NgbCalendar) { }

  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);

  D_2:string="";
  D_1:string="";
  D0:string="";
  D1:string="";
  D2:string="";


  iso:string="";

  selectedTrend: string = "";

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
  
    this.clickSelectDay(d);

    this.iso = new Date(d.year, d.month-1, d.day).toISOString();  
    let next = this.calendar.getNext(d);
    let prev = this.calendar.getPrev(d);
    let prev2 = this.calendar.getPrev(d, "d", 2);
    
    this.D_2 = `${prev2.day}.${prev2.month}.${prev2.year}`;
    this.D_1 = `${prev.day}.${prev.month}.${prev.year}`;
    this.D0 = `${d.day}.${d.month}.${d.year}`;
    this.D1 = `${next.day}.${next.month}.${next.year}`;

  });

  ngOnInit(): void {
  }
  
  clickSelectDay(d: NgbDate): void {
		//console.log("Date selection changed ", date)
    let from = new Date(d.year, d.month-1, d.day, 7,0,0,0);
    let to = new Date(d.year, d.month-1, d.day, 7,0,0,0);
    from.setDate(to.getDate() - 5);
    to.setDate(to.getDate() + 1);
    this.store.dispatch(actions.loadOpdataRangeWithFromTo({url:"/dataset/2", from: from.toISOString(), to: to.toISOString()}));
	}

  openScrollableContent(longContent: any, key : string) {
    this.selectedTrend = key;
    this.modalService.open(longContent, { scrollable: true });
	}

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
