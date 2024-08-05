import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SeasonsInjectState } from '../features/statistics/season.models';


export const selectSeasonInjState = createFeatureSelector<SeasonsInjectState>('seasonInject');

export const selectSeasons = createSelector(
    selectSeasonInjState,
    (s1: SeasonsInjectState) => {
        return s1.seasons;
    }
);