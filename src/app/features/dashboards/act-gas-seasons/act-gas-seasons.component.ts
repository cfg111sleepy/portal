
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActGasSeason, PsgNsi } from 'src/app/models/season-act-gas';
import * as actions from 'src/app/state/act-gas-season.actions';
import * as selectors from 'src/app/state/act-gas-season.selectors';


@Component({
  selector: 'app-act-gas-seasons',
  templateUrl: './act-gas-seasons.component.html',
  styleUrls: ['./act-gas-seasons.component.scss']
})
export class ActGasSeasonsComponent implements OnInit {

//  stats$ = this.service.getSeasonStatistics("63ca62350cfd13e7121072d1");
  selectedObject = 0;

  psgNsi$ = this.store.select(selectors.selectAllPsgNsi);
  seasons$ = this.store.select(selectors.selectCurrSeasonRows);

  seasons: ActGasSeason[] = [];
  psgNsi: PsgNsi[] = [];

  sub1 = this.seasons$.subscribe(s=>{
    this.seasons = s;
  });

  sub2 = this.psgNsi$.subscribe(s=>{
    this.psgNsi = s;
  });
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(actions.getAllPsgNsi());
  }


  changePsg() {
    this.store.dispatch(actions.getSeasonsForPsg( { object : this.selectedObject}));
  }

  
}
