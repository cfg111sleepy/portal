import { createReducer, on } from '@ngrx/store';

import * as loaderActions from './loader.actions';

export const initialState: boolean= false;

export const loaderReducer = createReducer(
  initialState,
  on(loaderActions.show, (state, {  }) => true ),
  on(loaderActions.hide, (state, {  }) => false ),
  
);