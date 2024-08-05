import { createReducer, on } from '@ngrx/store';
import { StatPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import * as actions from './stat.actions'

export const initialState: StatPacket = {
    data:[]
};
 
export const statisticsReducer = createReducer(
  initialState,
  on(actions.loadOpSuccess, (state, { payload }) => payload),
  on(actions.loadOpdataError, (state, { error }) => { return { data:[] }} ),
);