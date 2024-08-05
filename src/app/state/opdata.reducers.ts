import { createReducer, on } from '@ngrx/store';
import { OpDataPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import * as opDataACtions from './opdata.actions'

export const initialState: OpDataPacket = {
    data:[]
};
 
export const opdataReducer = createReducer(
  initialState,
  on(opDataACtions.loadOpSuccess, (state, { payload }) => payload),
  on(opDataACtions.loadOpdataError, (state, { error }) => { return { data:[] }} ),
);