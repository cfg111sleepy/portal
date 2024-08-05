import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as storeActions from '../state/stores-gpa.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AggregateGasStoreService } from '../services/aggr-gas-stores.service';


@Injectable()
export class StoresGpaEffects {
  //
  load1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getAllPsg),
      mergeMap((payload) => this.apiService.getAllGasStoresState(payload.iso_ts)
        .pipe(
          map(resp => ( storeActions.getAllPsgOk({ data: resp.data })) ),
          catchError((error) => of( storeActions.getAllPsgError({error : error}) )
        )
      )
    )
  ));
  
  //
  load2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getAllGpa),
      mergeMap((payload) => this.apiService.getAllAggregatesState(payload.iso_ts)
        .pipe(
          map(resp => ( storeActions.getAllGpaOk({ data: resp.data })) ),
          catchError((error) => of( storeActions.getAllGpaError({error : error}) )
        )
      )
    )
  ));
  

  constructor(
    private actions$: Actions,
    private apiService: AggregateGasStoreService
  ) {}
}