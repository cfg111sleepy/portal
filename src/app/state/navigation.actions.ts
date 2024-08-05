import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';
 
export const navigateTo = createAction(
  '[Navigator] Navigate',
  props<{ url: string, params?: NavigationExtras  | undefined}>()
);