import { TreeMenuNode } from "../side-menu-tree/tree-menu-node.model";


export interface AppState {
    currentUser:User;
    sideMenu: TreeMenuNode[];
    selectedNode: TreeMenuNode;
    error?: Error;    
}

export interface User {
    _id: number;
    name: string;
    role?:   number;
    profile?:  number;
    is_domain?:boolean;
    login?:    string;
    password?: string;
    roleName?:   string;
    profileName?:  string;
    __v?:number;
}

//----------------------------
export interface UserResponse {
    data:  User;
}

export interface RoleResponse {
    data:  Role;
}

export interface ProfileResponse {
    data:  Profile;
}


export interface UsersPage {
    skip:  number;
    limit: number;
    total: number;
    data:  User[];
}


export interface Role {
    _id:        number;
    name:       string;
    full_name?:  string;
}

export interface Profile {
    _id:        number;    
    side_menu?:  TreeMenuNode[];
    name:       string;
}

export interface UsersState {
    selectedUser?: User;
    users: User[];
    selectedPage: number;
    rolesSelector: Role[];
    profilesSelector: Profile[];
    pageSize: number;
    collectionSize: number;
    role?: Role,
    profile?: Profile,
    error?: Error
  }