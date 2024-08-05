import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as navigationActions  from 'src/app/state/navigation.actions';
import * as userActions from 'src/app/state/user.actions';
import * as userSelectors from 'src/app/state/user.selectors';
import { Profile, Role, User } from '../../login/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  usersState$ = this.store.select(userSelectors.selectUsersState);
  roles?: Role[];
  profiles?: Profile[];
  user : User = {
    _id:0,
    name:""
  };

  sub1 = this.usersState$.subscribe(state=>{
    this.user = state.selectedUser!;
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
    console.log(f.value)
    f.value.__v = 1;
    this.store.dispatch(userActions.editUser({user: f.value}));
  }

  back(){
    this.store.dispatch(navigationActions.navigateTo({url: `/users/list`, params:{}}))
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
