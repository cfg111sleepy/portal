import { createAction, props } from '@ngrx/store';
import { NgbDatesRange } from '../features/range/range.models';

 
export const newDatesRange = createAction(
  '[Range] Select new range of dates',
  props<{ range: NgbDatesRange }>()
);