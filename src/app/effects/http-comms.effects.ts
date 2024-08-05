import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../state/http-comms.actions';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { GasStorageMapService } from '../features/dashboards/gas-storage-map/gas-storage-map.service';
import { of } from 'rxjs';

@Injectable()
export class HttpCommsEffects {

  loadFlowForecastTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadFlowForecastTable),
        mergeMap(action =>
          this.httpService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (actions.loadFlowForecastSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(actions.loadHttpError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadConsumeTemperatureTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadConsumeTemperatureTable),
        mergeMap(action =>//exhaustMap
          this.httpService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (actions.loadConsumeTemperatureTableSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(actions.loadHttpError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadConsumeRegionsTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadConsumeRegionsTable),
        mergeMap(action =>
          this.httpService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (actions.loadConsumeRegionsTableSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(actions.loadHttpError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadDiffTable = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadDiffTable),
        mergeMap(action =>
          this.httpService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (actions.loadDiffTableSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(actions.loadHttpError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadTable1 = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadTable1),
        mergeMap(action =>
          this.httpService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (actions.loadTable1Success({ payload })) ),   //=>Success
            catchError(  (error) => of(actions.loadHttpError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );
  constructor(
    private actions$: Actions,
    private httpService: GasStorageMapService,
  ) {}
}