import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AgsiApiResp, AgsiState } from '../features/dashboards/agsi-gie-eu/agsi-gie-eu.models';

export const selectState = createFeatureSelector<AgsiState>('agsi');

export const selectedDay = createSelector(
    selectState,
  (s1) => {
    return s1.day; 
  }
);

export const selectedEUDay = createSelector(
    selectState,
    selectedDay,
    (s1,s2) => {
        return s2?.data[0]; 
    }
);
export const selectNonEUDay = createSelector(
  selectState,
  selectedDay,
  (s1,s2) => {
      return s2?.data[1]; 
  }
);

export const selectHistory = createSelector(
    selectState,
  (s1) => {
    return s1.hist; 
  }
);

export const selectDayLastY = createSelector(
  selectState,
(s1) => {
  return s1.dayLastY; 
}
);

export const selectedEUDayLastY = createSelector(
  selectState,
  selectDayLastY,
  (s1,s2) => {
      return s2?.data[0]; 
  }
);

export const selectNonEUDayLastY = createSelector(
selectState,
selectDayLastY,
(s1,s2) => {
    return s2?.data[1]; 
}
);