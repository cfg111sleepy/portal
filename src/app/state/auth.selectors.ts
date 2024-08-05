import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, User } from '../features/login/user.model';

export const selectUser = createFeatureSelector<AppState>('user');

export const selectCurrentUser = createSelector(
    selectUser,
  (s1: AppState) => {
    return s1.currentUser; 
  }
);

export const selectSideMenu = createSelector(
  selectUser,
(s1: AppState) => {
  return s1.sideMenu; 
}
);

export const selectedNode = createSelector(
  selectUser,
(s1: AppState) => {
  return s1.selectedNode; 
}
);

export const selectedError = createSelector(
  selectUser,
(s1: AppState) => {
  return s1.error; 
}
);