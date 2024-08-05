import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as statActions from '../state/stat.actions';
import { catchError, exhaustMap, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GasStorageMapService } from '../features/dashboards/gas-storage-map/gas-storage-map.service';
import { of } from 'rxjs';

@Injectable()
export class StatDataEffects {

  loadTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(statActions.loadTable),
        exhaustMap(action =>
          this.opDataService.getStatistics(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (statActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(statActions.loadOpdataError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private opDataService: GasStorageMapService,

  ) {}
}