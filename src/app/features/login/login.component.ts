import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mainSelectors from '../../state/auth.selectors';
import { selectQueryParams } from '../../state/router.selectors';

import {
  login
} from '../../state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string = "xxxxxxx-xx@utg.ua";
  password: string = "";
  
  errorMsg? : Error;

  appState$ = this.store.select(mainSelectors.selectUser);
  appError$ = this.store.select(mainSelectors.selectedError);

  queryParams$ = this.store.select(selectQueryParams);

  sub1 = this.appState$.subscribe(s=> {
    if (s.currentUser._id)  {
      //navigate home
      this.router.navigate(["/"]);
    }
  });

  sub2 = this.queryParams$.subscribe(routedata=> {
    console.log(routedata);
  });

  sub3 = this.appError$.subscribe(err=> {
    //console.log(err);
    this.errorMsg = err;
  });

  constructor( private store: Store, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.clearErr(), 50)
  }
  
  clearErr() {
    this.errorMsg = undefined;
  }

  onLogin() { 
    this.clearErr();
    //console.log(this.username)
    this.store.dispatch(login({ username: this.username,  password: this.password}));
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
