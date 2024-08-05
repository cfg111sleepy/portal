import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as navigationActions  from 'src/app/state/navigation.actions';
import * as userActions from 'src/app/state/user.actions';
import * as userSelectors from 'src/app/state/user.selectors';
import { Profile, Role, User } from '../../login/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  
  usersState$ = this.store.select(userSelectors.selectUsersState);
  
  roles?: Role[];
  profiles?: Profile[];

  user : User = {
    _id:0,
    name:""
  };

  sub1 = this.usersState$.subscribe(state=>{
    this.roles = state.rolesSelector;
    this.profiles = state.profilesSelector;
  });

  constructor(private store: Store) { 

  }

  ngOnInit(): void {
    this.store.dispatch(userActions.fillProfilesSelector() );
    this.store.dispatch(userActions.fillRolesSelector());
  }


  save(f: NgForm): void {
    console.log(f.value, f.valid);
    if (f.valid) {
      this.store.dispatch(userActions.createUser({user: f.value}));
    }
    
  }

  back(){
    this.store.dispatch(navigationActions.navigateTo({url: `/users/list`, params:{}}))
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
