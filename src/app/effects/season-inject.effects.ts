import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { SeasonsService } from '../features/statistics/seasons.service';

import * as seasonActions from '../state/season-inj.actions';

@Injectable()
export class SeasonInjectEffects {

  getSeasonsForPsg$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(seasonActions.getSeasonsForYear),
        exhaustMap(action =>
          this.seasonService.getSeasonsInjectForYear(action.year).pipe(
            map(res => (seasonActions.getSeasonsForPsgOk({ data:res }))),
            catchError(error => of(seasonActions.getSeasonsForPsgErr({ error })))
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