import { createReducer, on } from '@ngrx/store';
import { SeasonsState } from '../features/statistics/season.models';
import * as seasonActions from './season.actions';

export const initialState: SeasonsState = {
    selectedPsg: 0,
    selectedSeason: "",
    allPsgNsi: [],
    seasons: [],
    seasons1: [],
  };

  export const seasonReducer = createReducer(
    initialState,
  
    on(seasonActions.getAllPsgNsiOk, (state, action) => {
      return {
        ...state,
        allPsgNsi:action.data,
      };
    }),
    on(seasonActions.getAllPsgNsiError, (state, action) => {
        return {
          ...state,
          error:action.error,
          allPsgNsi: []
        };
    }),

    on(seasonActions.getSeasonsForPsg, (state, action) => {
        return {
          ...state,
          selectedPsg: action.object,
          selectedSeason: "",
          seasons: [],
          stats: undefined,
        };
    }),

    on(seasonActions.getStatForSeason, (state, action) => {
      return {
        ...state,
        selectedSeason: action.seasonId,
      };
    }),

    on(seasonActions.getSeasonsForPsgOk, (state, action) => {
        return {
          ...state,
          seasons:action.data
        };
    }),
    on(seasonActions.getSeasonsForPsgErr, (state, action) => {
        return {
          ...state,
          seasons:[],
          error:action.error
        };
    }),
    on(seasonActions.getStatForSeasonOk, (state, action) => {
        return {
          ...state,
          stats: action.stat,
          error: undefined
        };
    }),
    on(seasonActions.getStatForSeasonErr, (state, action) => {
        return {
          ...state,
          stats: undefined,
          error:action.error
        };
    }),
    
    on(seasonActions.getSeasonsArrOK, (state, action) => {
      return {
        ...state,
        seasons1: action.data,
        error: undefined
      };
  }),  

  );  