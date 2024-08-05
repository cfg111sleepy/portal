import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { createAction, props } from '@ngrx/store';

 
export const newDay = createAction(
  '[Calendar] Select new day',
  props<{ date: NgbDate }>()
);

