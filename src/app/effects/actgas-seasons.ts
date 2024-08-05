import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import * as seasonActions from '../state/act-gas-season.actions';
import { SharedHttpService } from '../services/shared-http.service';

@Injectable()
export class ActGasSeasonEffects {
 
  getPsgNsi$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getAllPsgNsi),
        exhaustMap(action =>
          this.httpService.getAllPsgNSI().pipe(
            map(res => (seasonActions.getAllPsgNsiOk({ data:res }))),
            catchError(error => of(seasonActions.getAllPsgNsiError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  getSeasonsForPsg$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getSeasonsForPsg),
        exhaustMap(action =>
          this.httpService.getActGasSeasons(action.object).pipe(
            map(res => (seasonActions.getSeasonsForPsgOk({ data: res.data }))),
            catchError(error => of(seasonActions.getSeasonsForPsgErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  constructor(
    private actions$: Actions,
    private httpService: SharedHttpService
  ) {}
}