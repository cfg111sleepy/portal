import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as seasonActions from 'src/app/state/season.actions';
import * as seasonSelectors from 'src/app/state/season.selectors';

import { MonthStat, Psg, Season, SeasonsState, SeasonStats, Stats } from '../season.models';
import { SeasonsService } from '../seasons.service';

@Component({
  selector: 'app-season-stat-table',
  templateUrl: './season-stat-table.component.html',
  styleUrls: ['./season-stat-table.component.scss']
})
export class SeasonStatTableComponent implements OnInit {

//  stats$ = this.service.getSeasonStatistics("63ca62350cfd13e7121072d1");
  selectedObject = 0;
  selectedSeason = "";

  state$ = this.store.select(seasonSelectors.selectSeasonState);
  isInject$ = this.store.select(seasonSelectors.selectCurrSeasonIsInject);
  isWith$ = this.store.select(seasonSelectors.selectCurrSeasonIsWith);
  season$ = this.store.select(seasonSelectors.selectCurrSeason);
  
  season? : Season;
  
  state?: SeasonsState;

  sub1 = this.state$.subscribe(state=> {
    this.state = state;
    this.selectedObject = state.selectedPsg;
    this.selectedSeason = state.selectedSeason;
  });

  sub2 = this.season$.subscribe(s=>{
    this.season = s;
  });
  
  constructor(private service : SeasonsService,private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(seasonActions.getAllPsgNsi());
  }


  changePsg() {
    this.store.dispatch(seasonActions.getSeasonsForPsg( { object : this.selectedObject}));
  }

  changeSeason() {
    this.store.dispatch(seasonActions.getStatForSeason( { seasonId: this.selectedSeason}));
  }
  
}
