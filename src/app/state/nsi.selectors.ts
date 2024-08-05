import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NSI } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
 
export const selectNSI = createFeatureSelector<ReadonlyArray<NSI>>('nsi');

export const selectNSIArray = createSelector(
  selectNSI,
  (s1) => {
    return s1.map((nsi) => nsi);
  }
);
