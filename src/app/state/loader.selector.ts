import { createFeatureSelector } from '@ngrx/store';

export const selectLoader = createFeatureSelector<boolean>('loading');

