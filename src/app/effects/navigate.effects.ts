import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { navigateTo } from '../state/navigation.actions';
import * as userActions from '../state/auth.actions';
import { mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectQueryParams } from '../state/router.selectors';

@Injectable()
export class NavigateEffects {
  //1 -----
  route$ = createEffect(() =>
    this.actions$.pipe(
      ofType(navigateTo),
      tap((props) => {
        if (props.params) {
          this.router.navigate([props.url], props.params)
        } else {
          this.router.navigate([props.url])
        }
      }            
      )        
  ), 
    { dispatch: false }
  );
/*
  //2  -------
  loginok$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginOk),
      withLatestFrom(this.store.select(selectQueryParams)),
      mergeMap((routedata) =>{ 
        //if there is return url
        if (routedata[1] && routedata[1]['return']) {
          this.router.navigate([routedata[1]['return']])
        } else {
          //navigate home
          this.router.navigate(["/"])
        }
        return routedata
      }),        
  )
  , { dispatch: false }
  );  
*/

  logoutok$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.logOutOk),
      tap((props) => this.router.navigate(["/login"]))        
  )
  , { dispatch: false }
  );  



  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}
}