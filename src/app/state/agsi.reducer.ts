import { createReducer, on } from '@ngrx/store';
import { AgsiState } from '../features/dashboards/agsi-gie-eu/agsi-gie-eu.models';
import * as agsiActions from './agsi.actions';

export const initialState: AgsiState = {
};

export const agsiReducer = createReducer(
    initialState,

    on(agsiActions.getGasDayOk, (state, action) => {
        return {
          ...state,
          day: action.data  
        };
    }),
    on(agsiActions.getGasDayErr, (state, action) => {
        return {
          ...state,
          error: action.error  
        };
    }),
    on(agsiActions.getHistOk, (state, action) => {
        return {
          ...state,
          hist: action.data  
        };
    }),
    on(agsiActions.getHistErr, (state, action) => {
        return {
          ...state,
          error: action.error  
        };
    }),
    on(agsiActions.getGasDayOkLastYear, (state, action) => {
      return {
        ...state,
        dayLastY: action.data  
      };
  }),

);