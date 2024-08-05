import { Component, OnInit } from '@angular/core';
import { SeasonPsgStatData, SeasonSelector } from 'src/app/models/season-act-gas';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/state/season.actions';
import * as selectors from 'src/app/state/season.selectors';

@Component({
  selector: 'app-psg-seasons',
  templateUrl: './psg-seasons.component.html',
  styleUrls: ['./psg-seasons.component.scss']
})
export class PsgSeasonsComponent implements OnInit {

  selectedObject: string = '0';

  season_select: SeasonSelector[] = [];
  seasons$ = this.store.select(selectors.selectSeasonsArray);
  seasons: SeasonPsgStatData[]=[];

  constructor(private store: Store) { }


  sub1 = this.seasons$.subscribe(s=> {
    let temp = s.filter(s=> s.name);
    temp = [...temp];
    temp.sort((a,b)=> a.order - b.order);
    this.seasons = temp;
  });


  ngOnInit(): void {
    this.season_select = this.fillSeasonSelector();
    let selected = this.season_select.find(s=> s.key == this.selectedObject);
    if (!selected) return;
    this.store.dispatch(actions.getSeasonsArr( { value : selected.value, from:selected.start, to:selected.end}));
  }


  fillSeasonSelector() {
    let result: SeasonSelector[] = [];
    let year = new Date().getFullYear();
    let month = new Date().getMonth();  //0..11
    let key = 0;
    let count = 10;
    let injection = (month >= 4 && month < 9) ? true : false;

    while (key < count) {
      let s : SeasonSelector = {option:`Закачування ${year}`, key:`${key}`, start:`${year}-03-01`, end:`${year}-06-01`, value:`1`};
      result.push(s);
      key++;
      s = {option:`Відбір ${year}-${year+1}`, key:`${key}`, start:`${year}-09-01`, end:`${year}-12-01`, value:`2`};
      result.push(s);
      key++;
      year--;
    }

    return result;
  }

  changePsg() {
    let selected = this.season_select.find(s=> s.key == this.selectedObject);
    if (!selected) return;
    this.store.dispatch(actions.getSeasonsArr( { value : selected.value, from:selected.start, to:selected.end}));

  }

}
