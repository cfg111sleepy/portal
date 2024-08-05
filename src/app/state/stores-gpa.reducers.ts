import { createReducer, on } from '@ngrx/store';
import * as actions from './stores-gpa.actions';
import { AllGpaGasStoreState } from '../models/gas-stores';

export const initialState: AllGpaGasStoreState = {
    stores:  [],
    aggregs: []
  };

  export const storesGpaReducer = createReducer(
    initialState,
  
    on(actions.getAllPsgOk, (state, action) => {
        return {
          ...state,
          stores: action.data,
          error: undefined,
        };
    }),
    on(actions.getAllPsgError, (state, action) => {
        return {
          ...state,
          stores: [],
          error: action.error,
        };
    }),
    on(actions.getAllGpaOk, (state, action) => {
        return {
          ...state,
          aggregs: action.data,
          error: undefined,
        };
    }),
    on(actions.getAllPsgError, (state, action) => {
        return {
          ...state,
          aggregs: [],
          error: action.error,
        };
    }),



  );  