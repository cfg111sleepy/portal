import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as opDataActions from '../state/opdata.actions';
import { catchError, exhaustMap, map, mergeMap,  withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GasStorageMapService } from '../features/dashboards/gas-storage-map/gas-storage-map.service';
import { selectCalendarDateIso } from '../state/calendar.selectors';
import { of } from 'rxjs';
import { selectDatesRangeIso } from '../state/range.selectors';
import * as FileSaver from 'file-saver';

@Injectable()
export class OpdataEffects {
  //
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(opDataActions.loadOpdata),
      withLatestFrom(this.store.select(selectCalendarDateIso)),
      mergeMap((md) => this.opDataService.get(md[0].url, `${md[1]}`).pipe(

            map( payload => (opDataActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError({error})) ) //=> Error
            )),        
    )
  );  
  
  loadRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(opDataActions.loadOpdataRange),
      withLatestFrom(this.store.select(selectDatesRangeIso)),
      mergeMap((md) => this.opDataService.getRange(md[0].url, `${md[1].from}`, `${md[1].to}`).pipe(

            map( payload => (opDataActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError({error})) ) //=> Error
            )),        
    )
  );

  loadRange1$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(opDataActions.loadOpdataRangeWithFromTo),
        exhaustMap(action =>
          this.opDataService.getRange(action.url, action.from, action.to).pipe(
            map( payload => (opDataActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  loadTable$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(opDataActions.loadTable),
        mergeMap(action =>  //exhaustMap
          this.opDataService.getTable(action.objects, action.parameters, action.from, action.to).pipe(
            map( payload => (opDataActions.loadOpSuccess({ payload })) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError({error})) ) //=> Error
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );
// excel export
  exportExcell$ = createEffect(() =>
    this.actions$.pipe(
      ofType(opDataActions.xlsExportRange),
      withLatestFrom(this.store.select(selectDatesRangeIso)),
      mergeMap((md) => this.opDataService.getExcel(md[0].objects, md[0].parameters, md[0].from, md[0].to).pipe(

            map( payload => ( FileSaver.saveAs(payload.body, md[0].fileName) ) ),   //=>Success
            catchError(  (error) => of(opDataActions.loadOpdataError({error})) ) //=> Error
            )),        
    ), 
    { dispatch: false }
  );


  constructor(
    private store: Store,
    private actions$: Actions,
    private opDataService: GasStorageMapService,

  ) {}
}