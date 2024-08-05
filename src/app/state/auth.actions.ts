import { createAction, props } from '@ngrx/store';
import { User } from '../features/login/user.model';


export const whoami = createAction(
  '[User] Init',
  //props<{ username: string, password:string }>()
);

export const login = createAction(
  '[User] Login',
  props<{ username: string, password:string }>()
);

export const loginOk = createAction(
    '[User] Authentification Success',
    props<{currentUser: User}>()
);

export const loginFail = createAction(
    '[User] Authentification Failed',
    props<{ error: any }>()
);

export const logOut = createAction(
  '[User] LogOut',
  //props<{  }>()
);

export const logOutOk = createAction(
    '[User] Logout Success',
    //props<{}>()
);

export const logOutFail = createAction(
    '[User] Logout Failed',
    props<{ error: any }>()
);
