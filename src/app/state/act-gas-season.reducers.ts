import { createReducer, on } from '@ngrx/store';
import * as seasonActions from './act-gas-season.actions';
import { ActGasSeasonsState } from '../models/season-act-gas';

export const initialState: ActGasSeasonsState = {
    selectedPsg: 0,
    psgNsi: [],
    seasons: [],
  };

  export const actGasSeasonReducer = createReducer(
    initialState,
  
    on(seasonActions.getAllPsgNsiOk, (state, action) => {
      return {
        ...state,
        psgNsi: action.data,
      };
    }),

    on(seasonActions.getAllPsgNsiError, (state, action) => {
        return {
          ...state,
          error: action.error,
          psgNsi: []
        };
    }),

    on(seasonActions.getSeasonsForPsg, (state, action) => {
        return {
          ...state,
          selectedPsg: action.object,
          seasons: [],
          stats: undefined,
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