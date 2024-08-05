import { createAction, props } from '@ngrx/store';
import { Profile, Role, User, UsersPage } from '../features/login/user.model';
import { TreeMenuNode } from '../features/side-menu-tree/tree-menu-node.model';


export const getUserById = createAction(
    '[User] Get by id',
    props<{ id: number}>()
);

export const getUserByIdOk = createAction(
    '[User] Get by id Ok',
    props<{ user: User}>()
);

export const getUserByIdError = createAction(
    '[User] Get by id Error',
    props<{error: Error}>()
);


export const editUser = createAction(
    '[User] Edit user',
    props<{user: User}>()
);

export const editUserOk = createAction(
    '[User] Edit user Ok',
    props<{ user: User}>()
);

export const editUserError = createAction(
    '[User] Edit user Error',
    props<{error: Error}>()
);

export const loadUserPage = createAction(
    '[User] Load users page',
    props<{ skip: number, limit: number, page:number}>()
);

export const loadUserPageOk = createAction(
    '[User] Load users page Ok',
    props<{ userPage: UsersPage}>()
);

export const loadUserPageError = createAction(
    '[User] Load users page Error',
    props<{ error: Error}>()
);

export const createUser = createAction(
    '[User] Create user',
    props<{user: User}>()
);
export const createUserOk = createAction(
    '[User] Create user Ok',
    props<{ user: User }>()
);
export const createUserError = createAction(
    '[User] Create user Err',
    props<{ error: Error }>()
);


export const fillRolesSelector = createAction(
    '[User] Fill roles selector',
    //props<{ }>()
);

export const fillProfilesSelector = createAction(
    '[User] Fill profiles selector',
    //props<{ }>()
);

export const fillRolesSelectorOK = createAction(
    '[User] Fill roles selector Ok',
    props<{ roles: Role[]}>()
);

export const fillProfilesSelectorOk = createAction(
    '[User] Fill profiles selector Ok',
    props<{ profiles: Profile[]}>()
);

export const fillRolesSelectorErr = createAction(
    '[User] Fill roles selector Err',
    props<{ error: Error}>()
);

export const fillProfilesSelectorErr = createAction(
    '[User] Fill profiles selector Err',
    props<{ error: Error}>()
);

export const delUserById = createAction(
    '[User] Del by id',
    props<{ id: number}>()
);

export const delUserByIdOk = createAction(
    '[User] Del by id Ok',
    //props<{ id: number}>()
);

export const delUserByIdError = createAction(
    '[User] Del by id Error',
    props<{error: Error}>()
);

export const setPassword = createAction(
    '[User] Set password',
    props<{ id: number, password: string}>()
);
export const setPasswordOk = createAction(
    '[User] Set password Ok',
    //props<{ id: number, password: string}>()
);
export const setPasswordErr = createAction(
    '[User] Set password err',
    props<{ error:Error }>()
);

export const loadProfile = createAction(
    '[User] LoadProfile',
    props<{ id: number}>()
);
export const loadProfileOk = createAction(
    '[User] LoadProfile Ok',
    props<{ menu: TreeMenuNode[]}>()
);
export const loadProfileErr = createAction(
    '[User] LoadProfileErr',
    props<{ error:Error }>()
);