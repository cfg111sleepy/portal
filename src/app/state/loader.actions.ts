import { createAction, props } from '@ngrx/store';

 
export const show = createAction(
  '[Loader] Show',
  //props<{ username: string, password:string }>()
);

export const hide = createAction(
    '[Loader] Hide',
    //props<{currentUser: User}>()
);

