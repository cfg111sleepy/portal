import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User, UsersState } from '../features/login/user.model';

export const selectUsersState = createFeatureSelector<UsersState>('user1');

export const selectUsersPage = createSelector(
    selectUsersState,
  (state: UsersState) => {
    return state.users.map(u=> {
      return {
        ...u, 
        roleName: state.rolesSelector.find(r=>r._id == u.role)?.name,
        profileName: state.rolesSelector.find(r=>r._id == u.role)?.name
      }
    });
  }
);

