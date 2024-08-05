import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as opDataActions from '../../../state/opdata.actions'
import * as nsiActions from '../../../state/nsi.actions'
import * as opDataSelectors from '../../../state/opdata.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import * as nsiSelectors from '../../../state/nsi.selectors'

import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as agsiSelectors from '../../../state/agsi.selectors'
import * as agsiActions from '../../../state/agsi.actions'
import { AgsiDayData } from '../agsi-gie-eu/agsi-gie-eu.models';
import { NSI, Value } from '../gas-storage-map/gas-storage-map.models';

@Component({
  selector: 'app-gas-storage-map-grey',
  templateUrl: './gas-storage-map-grey.component.html',
  styleUrls: ['./gas-storage-map-grey.component.scss']
})
export class GasStorageMapGreyComponent implements OnInit, OnDestroy {
  
  nsiArray$ = this.store.select(nsiSelectors.selectNSIArray);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);

  D0:string="";
  D1:string="";
  D2:string="";
  iso:string="";
  selected:string="";

  nsiArray:NSI[] = [];

  active=1;

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  displayT = true;

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
  });

  sub2 = this.currDay$.subscribe(d=> {
    this.store.dispatch(opDataActions.loadOpdata({ url:"/charts" }));

    this.iso = new Date(d.year, d.month-1, d.day).toISOString();

    let next = this.calendar.getNext(d);
    let prev = this.calendar.getPrev(d);

    this.D0 = `${prev.day}.${prev.month}.${prev.year}`;
    this.D1 = `${d.day}.${d.month}.${d.year}`;
    this.D2 = `${next.day}.${next.month}.${next.year}`;
  });

  sub3 = this.nsiArray$.subscribe(map=> {
    this.nsiArray = map;
  });

  //add EU AGSI date part only
  isoDate$ = this.store.select(calendarSelectors.selectedDateSttring);//2023-03-01

  currEUDayData$ = this.store.select(agsiSelectors.selectedEUDay);//selectedEUDay data
  
  agsiData?: AgsiDayData;

  sub4 = this.isoDate$.subscribe(d=> {
    this.store.dispatch(agsiActions.getGasDay({date:d})); 
  });
  
  sub5 = this.currEUDayData$.subscribe(d=> {
    this.agsiData = d;
  });



  constructor(private store: Store, private calendar: NgbCalendar,private modalService: NgbModal) { }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  openScrollableContent(longContent: any, key : string) {
    this.selected = key.split('.')[0];
    this.store.dispatch( nsiActions.getNSIByObject({object:this.selected}) );
    this.modalService.open(longContent, { scrollable: true });
	}

  filterTab(tab:number): NSI[] {
    return this.nsiArray.filter(n=> n.tab == tab);
  }

  toggleT(state: boolean) {
    this.displayT = state;
  }

}
