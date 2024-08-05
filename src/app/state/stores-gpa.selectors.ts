import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AllGpaGasStoreState } from '../models/gas-stores';


export const selectState = createFeatureSelector<AllGpaGasStoreState>('allgpagasstore');

export const selectAllPsg = createSelector(
    selectState,
    (s1: AllGpaGasStoreState)=> {
        return s1.stores
    }
);

export const selectAllGpa = createSelector(
    selectState,
    (s1: AllGpaGasStoreState)=> {
        return s1.aggregs;
    }
);
