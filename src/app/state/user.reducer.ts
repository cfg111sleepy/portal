import { createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { Profile, Role, User, UsersPage, UsersState } from '../features/login/user.model';



export const initialState: UsersState = {
  selectedPage: 1,
  users:[],
  rolesSelector: [],
  profilesSelector:[],
  pageSize: 15,
  collectionSize:0,

};

export const user1Reducer = createReducer(
  initialState,

  on(userActions.fillProfilesSelectorOk, (state, action) => {
    return {
      ...state,
      profilesSelector: action.profiles
    };
  }),
  on(userActions.fillRolesSelectorOK, (state, action) => {
    return {
      ...state,
      rolesSelector: action.roles
    };
  }),
  on(userActions.getUserByIdOk, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
      error: undefined
    };
  }),
  on(userActions.getUserByIdError, (state, action) => {
    return {
      ...state,
      selectedUser: undefined,
      error: action.error
    };
  }),

  on(userActions.editUserOk, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
      error: undefined
    };
  }),

  on(userActions.editUserError, (state, action) => {
    return {
      ...state,
      selectedUser: undefined,
      error: action.error
    };
  }),

  on(userActions.delUserById, (state, action) => {
    const user = state.users.find(u => u._id == action.id);
    return {
      ...state,
      selectedUser : user,
      error: undefined
    };
  }),
 
  on(userActions.delUserByIdOk, (state, action) => {
    return {
      ...state,
      users : state.users.filter(u => u._id !== state.selectedUser?._id),
      error: undefined
    };
  }),
  on(userActions.delUserByIdError, (state, action) => {
    return {
      ...state,
      error: action.error,
      selectedUser: undefined
    };
  }),
  on(userActions.loadUserPageOk, (state, action) => {
    return {
      ...state,
      selectedPage: Math.floor(action.userPage.skip / action.userPage.limit) + 1,
      users: action.userPage.data,
      collectionSize: action.userPage.total,
      error: undefined
    };
  }),

  on(userActions.loadUserPageError, (state, action) => {
    return {
      ...state,
      selectedPage:1,
      users: [],
      collectionSize: 0,
      error: action.error
    };
  }),

  on(userActions.createUserOk, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
      error: undefined
    };
  }),
  on(userActions.createUserError, (state, action) => {
    return {
      ...state,
      selectedUser: undefined,
      error: action.error
    };
  }),
  on(userActions.setPasswordErr, (state, action) => {
    return {
      ...state,
      selectedUser: undefined,
      error: action.error
    };
  }),

);


