import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { createReducer, on } from '@ngrx/store';

import * as calendarActions from './calendar.actions';

export const initialState: NgbDate = new NgbDate(2000,1,1);

export const calendarReducer = createReducer(
  initialState,
  on(calendarActions.newDay, (state, { date }) => date ),
  
);