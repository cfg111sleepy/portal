import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as nsiActions from '../state/nsi.actions';
import * as authActions from '../state/auth.actions';
import * as dataActions from '../state/opdata.actions';
import * as naviActions from '../state/navigation.actions';

import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class ErrorEffects {
  
  loadOpDataErr$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActions.loadOpdataError),
      tap((payload) => {
        console.log(payload)  
        if (payload.error.status == 403) this.router.navigate(["/login"]);
      })        
  )
    , { dispatch: false }
  );  
  
 /*
  loadOpDataErr$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dataActions.loadOpdataError),
        mergeMap(props =>{
            if (props.error.status == 403) {
                return of(naviActions.navigateTo({url:"/login"}));
            } else {
                return EMPTY;
            }            
        }
        )
      ),
  );
*/
  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}