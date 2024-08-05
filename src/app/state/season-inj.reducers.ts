import { createReducer, on } from '@ngrx/store';
import { SeasonsInjectState } from '../features/statistics/season.models';
import * as seasonActions from './season-inj.actions';

export const initialState: SeasonsInjectState = {
    selectedYear: 0,
    seasons: [],
  };

  export const seasonInjectReducer = createReducer(
    initialState,
  
    on(seasonActions.getSeasonsForYear, (state, action) => {
        return {
          ...state,
          selectedYear: action.year,
          seasons: [],
        };
    }),

    on(seasonActions.getSeasonsForPsgOk, (state, action) => {
        return {
          ...state,
          seasons: action.data
        };
    }),

    on(seasonActions.getSeasonsForPsgErr, (state, action) => {
        return {
          ...state,
          seasons:[],
          error: action.error
        };
    }), 

  );  