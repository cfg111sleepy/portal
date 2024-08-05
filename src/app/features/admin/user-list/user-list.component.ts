import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as navigationActions  from 'src/app/state/navigation.actions';
import * as userActions from 'src/app/state/user.actions';
import * as userSelectors from 'src/app/state/user.selectors';
import { User } from '../../login/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  pageIndex = 1;
  usersState$ = this.store.select(userSelectors.selectUsersState);
  users$ = this.store.select(userSelectors.selectUsersPage);
  error?: Error;
  
  pageSize = 30;
  collectionSize = 0;
 
  sub1 = this.usersState$.subscribe(state=>{
    this.pageSize = state.pageSize;
    this.collectionSize = state.collectionSize;
    this.pageIndex = state.selectedPage;
    this.error= state.error;
  });
  

  constructor( private store: Store, ) { }

  ngOnInit(): void {
    this.store.dispatch(userActions.fillProfilesSelector() );
    this.store.dispatch(userActions.fillRolesSelector());

    this.store.dispatch(userActions.loadUserPage({ skip:(this.pageIndex-1)*this.pageSize, limit: this.pageSize, page: this.pageIndex}));
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  create() {
    this.store.dispatch(navigationActions.navigateTo({url: `users/create`}))
  }

  edit(id:number) {
    this.store.dispatch(userActions.getUserById({ id }));
    this.store.dispatch(navigationActions.navigateTo({url: `users/edit/${id}`}))
  }

  delete(id:number) {
    if (confirm(`Видалити користувача ${id} ?`)) {
      this.store.dispatch(userActions.delUserById({ id }));
    }
  }
  
  setPassword(id:number) {
    let password = prompt('Новий пароль');

    if (password) {
      this.store.dispatch(userActions.setPassword({ id, password}));
    }
  }

  changePage(page: number) {
    this.store.dispatch(userActions.loadUserPage({ skip:(page-1)*this.pageSize, limit: this.pageSize, page:page}));
  }

}
