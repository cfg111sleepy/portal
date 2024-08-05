import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as nsiActions from '../state/nsi.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { GasStorageMapService } from '../features/dashboards/gas-storage-map/gas-storage-map.service';


@Injectable()
export class NsiEffects {
  //
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nsiActions.getNSIByObject),
      mergeMap((payload) => this.apiService.getNsiByObject(payload.object)
        .pipe(
          map(resp => ( nsiActions.getNSIByObjectOk({ data: resp.data })) ),
          catchError((error) => of( nsiActions.getNSIByObjectError({error : error}) )
        )
      )
    )
  ));
  

  constructor(
    private store: Store,
    private actions$: Actions,
    private apiService: GasStorageMapService
  ) {}
}