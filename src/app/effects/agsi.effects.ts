import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as agsiActions from '../state/agsi.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AgsiGieEuService } from '../features/dashboards/agsi-gie-eu/agsi-gie-eu.service';


@Injectable()
export class AgsiEffects {
  //
  loadDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agsiActions.getGasDay),
      mergeMap((payload) => this.apiService.loadGasDay(payload.date)
        .pipe(
          map(resp => ( agsiActions.getGasDayOk({ data: resp })) ),
          catchError((error) => of( agsiActions.getGasDayErr({error : error}) )
        )
      )
    )
  ));
  
  //
  loadHis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agsiActions.getHist),
      mergeMap((payload) => this.apiService.loadDaysHistory(payload.from, payload.to, payload.code)
        .pipe(
          map(resp => ( agsiActions.getHistOk({ data: resp })) ),
          catchError((error) => of( agsiActions.getHistErr({error : error}) )
        )
      )
    )
  ));
 
    //
    loadDayLastY$ = createEffect(() =>
    this.actions$.pipe(
      ofType(agsiActions.getGasDayLastYear),
      mergeMap((payload) => this.apiService.loadGasDayLastYear(payload.date)
        .pipe(
          map(resp => ( agsiActions.getGasDayOkLastYear({ data: resp })) ),
          catchError((error) => of( agsiActions.getGasDayErr({error : error}) )
        )
      )
    )
  ));


  constructor(
    private store: Store,
    private actions$: Actions,
    private apiService: AgsiGieEuService
  ) {}
}