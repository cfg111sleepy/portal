import { createReducer, on } from '@ngrx/store';
import * as actions from './theme.actions';

export const initialState: string = "light";

export const themesReducer = createReducer(
  initialState,
  on( actions.selectTheme, (state, { name }) => name),
  on( actions.toggleTheme, (state, action) => {
    if (state == "dark") {
        return "light";
    } else {
        return "dark";
    }    
  })
);