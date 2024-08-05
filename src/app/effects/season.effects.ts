import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { SeasonsService } from '../features/statistics/seasons.service';

import * as seasonActions from '../state/season.actions';

@Injectable()
export class SeasonEffects {
 
  getPsgNsi$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getAllPsgNsi),
        exhaustMap(action =>
          this.seasonService.getAllPsgNSI().pipe(
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
          this.seasonService.getSeasonsForPsg(action.object).pipe(
            map(res => (seasonActions.getSeasonsForPsgOk({ data:res }))),
            catchError(error => of(seasonActions.getSeasonsForPsgErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  getSeasonStat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getStatForSeason),
        exhaustMap(action =>
          this.seasonService.getSeasonStat(action.seasonId).pipe(
            map(res => (seasonActions.getStatForSeasonOk({ stat:res }))),
            catchError(error => of(seasonActions.getStatForSeasonErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  getSeasonsArray$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getSeasonsArr),
        exhaustMap(action =>
          this.seasonService.getSeasonArray(action.value, action.from, action.to).pipe(
            map(res => (seasonActions.getSeasonsArrOK({ data:res }))),
            catchError(error => of(seasonActions.getStatForSeasonErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private seasonService: SeasonsService
  ) {}
}