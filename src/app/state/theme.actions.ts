import { createAction, props } from '@ngrx/store';
 
export const selectTheme = createAction(
  '[Themes] Set',
  props<{ name: string }>()
);

export const toggleTheme = createAction(
    '[Themes] Toggle',
  );