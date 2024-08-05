import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { navigateTo } from './state/navigation.actions';
import * as userActions from './state/auth.actions';

import * as loaderSelectors from './state/loader.selector';

import * as rangeActions from './state/range.actions';
import * as calendarActions from './state/calendar.actions';
import * as themeActions from './state/theme.actions';

import * as mainSelectors from './state/auth.selectors';

import { NavigationExtras } from '@angular/router';

import { CustomDatepickerI18n, I18n,  } from './datepicker-i18n.service';
import { User } from './features/login/user.model';
import { ThemesServiceService } from './themes-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }], // define custom NgbDatepickerI18n provider

})
export class AppComponent implements OnInit, OnDestroy {

hover: boolean  = false;

selectedDay: NgbDateStruct = {
  year:2022,
  month:11,
  day:20
};  

  constructor(
    private modalService: NgbModal, 
    private store: Store, 
    private calendar: NgbCalendar, 
    private themeService: ThemesServiceService
    ) { 
  }
 
  sideMenu$ = this.store.select(mainSelectors.selectSideMenu);

  appState$ = this.store.select(mainSelectors.selectUser);
  
  loader$ = this.store.select(loaderSelectors.selectLoader);

  currentUser : User = {
    _id:0,
    name:"Гість"
  };

  sub1 = this.appState$.subscribe(s=> {
    this.currentUser = s.currentUser;   
    console.log(s.currentUser)
    this.store.dispatch(userActions.whoami());
  });


  onNavigate(url:string, params: NavigationExtras) {
    this.store.dispatch(navigateTo({ url, params }));
  }
  
  ngOnInit() {
    let date = this.calendar.getToday();
    let rangeStart = this.calendar.getPrev(date, "m", 1);
    let date_1 = this.calendar.getPrev(date, "d", 1);
    this.selectedDay = date_1;
    this.store.dispatch(calendarActions.newDay({ date: date_1 }));

    let range = {
      from: rangeStart,
      to: date
    };

    this.store.dispatch(rangeActions.newDatesRange({ range}));
    
    this.store.dispatch(themeActions.selectTheme({name:"light"}));
    this.themeService.setActiveTheme("light");
  }


  singIn() {

  }

  singOut() {
    
    localStorage.removeItem("user");
    
    this.store.dispatch(navigateTo( {url: ""} ));
    this.store.dispatch(userActions.logOut());
  }
  
	clickSelectDay(date: NgbDate): void {
		//console.log("Date selection changed ", date)
    this.store.dispatch(calendarActions.newDay({ date }));
	}

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  hoverNavBar() {
    this.hover = !this.hover;
    //console.log(this.hover)
  }

  changeTheme() {
    this.themeService.changeActiveTheme();
    this.store.dispatch(themeActions.toggleTheme());
  }
  
  goToLink(url: string){
    window.open(environment.kimUrl + url, "_blank");
  }

}