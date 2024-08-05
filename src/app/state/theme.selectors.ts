import { createSelector, createFeatureSelector } from '@ngrx/store';
 
export const selectThemes = createFeatureSelector<string>('thema');

export const selectIsDark = createSelector(
    selectThemes,
    (s1) => {
      return s1=="dark";
    }
  );
 