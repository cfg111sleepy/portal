import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as weatherActions from '../state/temperatures.actions';
import { catchError, exhaustMap, map, mergeMap,  withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCalendarDateIso } from '../state/calendar.selectors';
import { of } from 'rxjs';
import { TemperatureMapService } from '../features/dashboards/temperature-map/temperature-map.service';


@Injectable()
export class WheaterEffects {
  //
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weatherActions.loadApidata),
      withLatestFrom(this.store.select(selectCalendarDateIso)),
      mergeMap((md) => this.apiService.get(md[1]).pipe(

            map( payload => (weatherActions.loadApiSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(weatherActions.loadApiError(error)) ) //=> Error
            )),        
    )
  );  
  
  fillCitiesSelector$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(weatherActions.loadCitiesNsi),
        exhaustMap(action =>
          this.apiService.getAllCities().pipe(
            map(res => (weatherActions.loadCitiesNsiOk({ data: res }))),
            catchError(error => of(weatherActions.loadCitiesNsiError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiService: TemperatureMapService
  ) {}
}