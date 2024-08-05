import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { UserService } from '../features/login/user.service';

import * as userActions from '../state/auth.actions';
import * as user1Actions from '../state/user.actions';
import { selectUsersPage } from '../state/user.selectors';

@Injectable()
export class UserEffects {
 
  logins$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.login),
        exhaustMap(action =>
          this.userService.login(action.username, action.password).pipe(
            map(currentUser =>  userActions.loginOk({ currentUser })),
            catchError(error => of(userActions.loginFail({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  whoami$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.whoami),
        exhaustMap(action =>
          this.userService.whoami().pipe(
            map(currentUser =>  userActions.loginOk({ currentUser })),
            catchError(error => of(userActions.loginFail({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  loginOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginOk),
        tap(action =>
            {
              localStorage.setItem('user', JSON.stringify(action.currentUser));
            }
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { dispatch: false }
  ); 

  logOutOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logOutOk),
        tap(action =>
            {
              localStorage.removeItem('user');
              localStorage.removeItem('menu');
            }
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { dispatch: false }
  ); 
  
  loadMenuOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.loadProfileOk),
        tap(action =>
            {
              localStorage.setItem('menu', JSON.stringify(action.menu));
            }
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { dispatch: false }
  ); 

  logouts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logOut),
        exhaustMap( () =>
          this.userService.logout().pipe(
            map( () => (userActions.logOutOk())),
            catchError(error => of(userActions.logOutFail({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );  

  //skip: this.pageSize*(this.pageIndex-1)
  loadUsersPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.loadUserPage),
        withLatestFrom(this.store.select(selectUsersPage)),
        exhaustMap( action =>
          this.userService.loadPage( (action[0].page-1) * action[0].limit, action[0].limit).pipe(
            map( res => ( user1Actions.loadUserPageOk({userPage: res}))),
            catchError(error => of(user1Actions.loadUserPageError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );  

  getById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.getUserById),
        exhaustMap(action =>
          this.userService.getById( action.id ).pipe(
            map(res => (user1Actions.getUserByIdOk({user: res.data}))),
            catchError(error => of(user1Actions.getUserByIdError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  edit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.editUser),
        exhaustMap(action =>
          this.userService.update( action.user ).pipe(
            map(res => (user1Actions.editUserOk({user: res.data}))),
            catchError(error => of(user1Actions.editUserError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );

  create$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.createUser),
        exhaustMap(action =>
          this.userService.create( action.user ).pipe(
            map(res => (user1Actions.createUserOk({user: res.data}))),
            catchError(error => of(user1Actions.createUserError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  fillRolesSelector$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.fillRolesSelector),
        exhaustMap(action =>
          this.userService.getAllRoles(  ).pipe(
            map(res => (user1Actions.fillRolesSelectorOK({ roles: res }))),
            catchError(error => of(user1Actions.fillRolesSelectorErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  fillProfilesSelector$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.fillProfilesSelector),
        exhaustMap(action =>
          this.userService.getAllProfiles( ).pipe(
            map(res => (user1Actions.fillProfilesSelectorOk({ profiles: res }))),
            catchError(error => of(user1Actions.fillProfilesSelectorErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  delById$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.delUserById),
        exhaustMap(action =>
          this.userService.delById( action.id ).pipe(
            map(res => (user1Actions.delUserByIdOk( ))),
            catchError(error => of(user1Actions.delUserByIdError({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  setPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(user1Actions.setPassword),
        exhaustMap(action =>
          this.userService.setPass( action.id, action.password ).pipe(
            map(res => (user1Actions.setPasswordOk( ))),
            catchError(error => of(user1Actions.setPasswordErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  loadProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginOk),
        exhaustMap(action =>
          this.userService.getProfile(action.currentUser.profile || 0).pipe(
            map(res => (user1Actions.loadProfileOk({ menu: res }))),
            catchError(error => of(user1Actions.loadProfileErr({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  constructor(
    private store: Store,
    private actions$: Actions,
    private userService: UserService
  ) {}
}