import { createReducer, on } from '@ngrx/store';
import * as actions from './http-comms.actions';
import { HttpCommsState } from '../models/http';

  export const initialState: HttpCommsState = {
  };

  export const httpcommsReducer = createReducer(
    initialState,
  
    on(actions.loadFlowForecastSuccess, (state, action) => {
        return {
          ...state,
          flow_forecast: action.payload,
          error: undefined
        };
    }),

    on(actions.loadConsumeTemperatureTableSuccess, (state, action) => {
      return {
        ...state,
        consume_temperature: action.payload,
        error: undefined
      };
    }),

    on(actions.loadConsumeRegionsTableSuccess, (state, action) => {
      return {
        ...state,
        consume_regiions: action.payload,
        error: undefined
      };
    }),

    on(actions.loadDiffTableSuccess, (state, action) => {
      return {
        ...state,
        consume_diffs: action.payload,
        error: undefined
      };
    }),

    on(actions.loadHttpError, (state, action) => {
        return {
          ...state,
          flow_forecast: undefined,
          error: action.error
        };
    }),
    
    on(actions.SetFloForecastTotalsRow, (state, action) => {
      return {
        ...state,
        totals1: action.payload,
      };
  }),

    on(actions.loadTable1Success, (state, action) => {
      return {
        ...state,
        table1: action.payload,
      };
  }),

  );  