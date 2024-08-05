import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SeasonsState } from '../features/statistics/season.models';


export const selectSeasonState = createFeatureSelector<SeasonsState>('season');

export const selectCurrSeasonIsInject = createSelector(
    selectSeasonState,
    (s1: SeasonsState)=> {
        let tmp = s1.seasons.find(s=> s._id == s1.selectedSeason);
        if (tmp) {
            return tmp.value == 1;
        } else {
            return false;
        }
        
    }
);
export const selectCurrSeasonIsWith = createSelector(
    selectSeasonState,
    (s1: SeasonsState)=> {
        let tmp = s1.seasons.find(s=> s._id == s1.selectedSeason);
        if (tmp) {
            return tmp.value == 2;
        } else {
            return false;
        }
        
    }
);
export const selectCurrSeason = createSelector(
    selectSeasonState,
    (s1: SeasonsState)=> s1.seasons.find(s=> s._id == s1.selectedSeason)
);

export const selectSeasonsArray = createSelector(
    selectSeasonState,
    (s1: SeasonsState)=> s1.seasons1
);