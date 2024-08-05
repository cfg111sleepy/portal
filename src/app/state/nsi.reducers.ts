import { createReducer, on } from '@ngrx/store';
import { NSI } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import * as nsiActions from './nsi.actions';

export const initialState: ReadonlyArray<NSI> = [];

export const nsiReducer = createReducer(
    initialState,
    on(nsiActions.getNSIByObjectOk, (state, { data }) => data),
    on(nsiActions.getNSIByObjectError, (state, action) => []),
  );