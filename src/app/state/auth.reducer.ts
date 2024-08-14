import { createReducer, on } from '@ngrx/store';

import * as userActions from './auth.actions';
import * as user1Actions from './user.actions';

import { AppState, User } from '../features/login/user.model';

const guest: User = {
  is_domain: true,
  _id: 30,
  name: "Звагольський Ігор Валерійович",
  login: "zvaholskyi-iv@utg.ua",
  role: 1,
  profile: 1,
  __v: 2
}

export const initialState: AppState = {
  currentUser: guest,
  sideMenu : [],
  selectedNode : {
    childNodes:[],
    name:"",
    icon:"",
    payload:{},
    expanded:false
  }
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loginOk, (state, props) => {
    return {
      ...state,
      currentUser: props.currentUser,
      error: undefined
    }
  }),

  on(userActions.loginFail, (state, props) => {
    return {
      ...state,
      error: props.error
    }
  }),

  on(userActions.logOutOk, (state, {  }) => {
    return {
      ...state,
      currentUser: guest,
      error: undefined
    }
  }),

  on(user1Actions.loadProfileOk, (state, props) => {
    return {
      ...state,
      sideMenu: props.menu
    }
  }),
  
  on(user1Actions.loadProfileErr, (state, props) => {
    return {
      ...state,
      sideMenu: []
    }
  }),
 
  
);