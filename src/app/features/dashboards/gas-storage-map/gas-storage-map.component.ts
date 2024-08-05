import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NSI, Value } from './gas-storage-map.models';

import * as opDataActions from '../../../state/opdata.actions'
import * as nsiActions from '../../../state/nsi.actions'
import * as opDataSelectors from '../../../state/opdata.selectors'
import * as calendarSelectors from '../../../state/calendar.selectors'
import * as nsiSelectors from '../../../state/nsi.selectors'

import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as agsiSelectors from '../../../state/agsi.selectors'
import * as agsiActions from '../../../state/agsi.actions'
import { AgsiDayData } from '../agsi-gie-eu/agsi-gie-eu.models';

@Component({
  selector: 'app-gas-storage-map',
  templateUrl: './gas-storage-map.component.html',
  styleUrls: ['./gas-storage-map.component.scss']
})
export class GasStorageMapComponent implements OnInit, OnDestroy {
  
  nsiArray$ = this.store.select(nsiSelectors.selectNSIArray);
  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  currDay$ = this.store.select(calendarSelectors.selectCalendarDate);

  select7_10$ = this.store.select(calendarSelectors.select7_10CurrentDay);
  select7_10 : boolean = false;

  D0:string="";
  D1:string="";
  D2:string="";
  iso:string="";
  selected:string="";
  selectedTrend: string = "";

  selectedName:string="";

  nsiArray:NSI[] = [];

  active=1;

  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  displayT = true;
  
  //add EU AGSI date part only
  isoDate$ = this.store.select(calendarSelectors.selectedDateSttring);//2023-03-01

  currEUDayData$ = this.store.select(agsiSelectors.selectedEUDay);//selectedEUDay data
  
  agsiData?: AgsiDayData;


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

  sub4 = this.isoDate$.subscribe(d=> {
    this.store.dispatch(agsiActions.getGasDay({date:d})); 
  });
  
  sub5 = this.currEUDayData$.subscribe(d=> {
    this.agsiData = d;
  });
  
  sub6 = this.select7_10$.subscribe(s=> {
    this.select7_10 = s;
    console.log(s);
  });


  constructor(private store: Store, private calendar: NgbCalendar,private modalService: NgbModal) { }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
    this.sub6.unsubscribe();
  }

  openScrollableContent(longContent: any, key : string) {
    this.selected = key.split('.')[0];

    /*
    ПСГ Більче-Волицько-Угерське	906024
  Більче-Волицьке (ГЗП1,3,4)	906035
  Угерське 16 гор. (ГЗП2)	906026
ПСГ Дашавське	906022
ПСГ Опарське	906021
ПСГ Богородчанське	903031
ПСГ Олишівське	901033
ПСГ Мринське	901032
ПСГ Солохівське	901031
ПСГ Пролетарське	902031
ПСГ Кегичівське	902032
ПСГ Червонопопівське	905031

    */

    switch (this.selected) {
      case "9902302":
          this.selectedName = "ДД АТ 'Укртрансгаз'";
          break;
      case "906024":
        this.selectedName = "ПСГ Більче-Волицько-Угерське";
        break;
      case "906022":
        this.selectedName = "ПСГ Дашавське";
        break;
      case "906021":
        this.selectedName = "ПСГ Опарське";
        break;
      case "903031":
        this.selectedName = "ПСГ Богородчанське";
        break;
      case "901033":
        this.selectedName = "ПСГ Олишівське";
        break;
      case "901032":
        this.selectedName = "ПСГ Мринське";
        break;
      case "901031":
        this.selectedName = "ПСГ Солохівське";
        break;
      case "902031":
        this.selectedName = "ПСГ Пролетарське";
        break;
      case "902032":
        this.selectedName = "ПСГ Кегичівське";
        break;
      case "905031":
        this.selectedName = "ПСГ Червонопопівське";
        break;

      default:
        this.selectedName = "";
        break;
    }

    this.store.dispatch( nsiActions.getNSIByObject({object:this.selected}) );
    this.modalService.open(longContent, { scrollable: true });
	}

  openScrollableContentTrend(longContent: any, key : string) {
    this.selectedTrend = key;
    this.modalService.open(longContent, { scrollable: true });
	}

  filterTab(tab:number): NSI[] {
    return this.nsiArray.filter(n=> n.tab == tab);
  }

  toggleT(state: boolean) {
    this.displayT = state;
  }

}
