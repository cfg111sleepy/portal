import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ActGasSeasonsState } from '../models/season-act-gas';

export const selectSeasonState = createFeatureSelector<ActGasSeasonsState>('actgasSeason');

export const selectAllPsgNsi = createSelector(
    selectSeasonState,
    (s1: ActGasSeasonsState)=> {
        return s1.psgNsi
    }
);

export const selectCurrSeasonRows = createSelector(
    selectSeasonState,
    (s1: ActGasSeasonsState)=> {
        return s1.seasons;
    }
);
