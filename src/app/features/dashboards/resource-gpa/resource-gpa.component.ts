import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as calendarSelectors from '../../../state/calendar.selectors'
import * as psgGpaSelectors from '../../../state/stores-gpa.selectors'
import * as actions from '../../../state/stores-gpa.actions'
import { GasStore } from 'src/app/models/gas-stores';
import { Aggregate } from 'src/app/models/aggregates';

@Component({
  selector: 'app-resource-gpa',
  templateUrl: './resource-gpa.component.html',
  styleUrls: ['./resource-gpa.component.scss']
})
export class ResourceGpaComponent implements OnInit, OnDestroy {  
  constructor(private store: Store, ) { }

  currDay$ = this.store.select(calendarSelectors.selectedDateSttring);
  stores$ = this.store.select(psgGpaSelectors.selectAllPsg);
  aggregs$ = this.store.select(psgGpaSelectors.selectAllGpa);

  D_N_Switch : boolean = false;

  stores:  GasStore[] = [];
  aggregs: Aggregate[] = [];

  sub1 = this.currDay$.subscribe(d=> {
    this.store.dispatch(actions.getAllPsg({ iso_ts: d + "T07:00"}));
    this.store.dispatch(actions.getAllGpa({ iso_ts: d + "T07:00"}));
  })

  sub2 = this.stores$.subscribe(d=> {
    this.stores = d;
  })

  sub3 = this.aggregs$.subscribe(d=> {
    this.aggregs = d;
  })

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  //  this.sub4.unsubscribe();
  //  this.sub5.unsubscribe();
  //  this.sub6.unsubscribe();
  }

  toggle_D_N(){
    this.D_N_Switch = !this.D_N_Switch;
  }

}
