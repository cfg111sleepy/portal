import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../state/auth.selectors';
import { User } from '../features/login/user.model';
import { navigateTo } from '../state/navigation.actions';
import ro from 'date-fns/esm/locale/ro/index.js';
import * as userActions from '../state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user$ = this.store.select(selectUser);
  
  currentUser: User = {_id:0, name:"Guest"};

  sub1 = this.user$.subscribe(s => {
    this.currentUser = s.currentUser;
    //console.log(this.currentUser)
  });

  constructor( private store: Store) {
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.log(state)
    //console.log(state.url, this.currentUser.role)
    /*
    if (this.currentUser._id > 0) {

      //TODO TODO TODO route access checks

      return true;

    } else {
      
      this.store.dispatch(navigateTo( {url: "/login", params:{ queryParams: { return: state.url } }  } ));
      return false;
    }
    */
    return true;
  }
  
}
