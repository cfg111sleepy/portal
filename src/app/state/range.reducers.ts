import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { createReducer, on } from '@ngrx/store';
import { NgbDatesRange } from '../features/range/range.models';

import * as actions from './range.actions';

export const initialState: NgbDatesRange = {
    from: new NgbDate(2000,1,1),
    to: new NgbDate(2000,1,1)
}

export const rangeReducer = createReducer(
  initialState,
  on(actions.newDatesRange, (state, { range }) => range ),
  
);