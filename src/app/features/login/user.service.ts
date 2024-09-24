import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TreeMenuNode } from '../side-menu-tree/tree-menu-node.model';
import { Profile, ProfileResponse, Role, RoleResponse, User, UserResponse, UsersPage } from './user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl + '/auth/loginc', { username, password }, { withCredentials: true }).pipe(map((user) => user));
  }

  whoami() : Observable<User> {
    // return this.http.get<User>(environment.apiBaseUrl + `/auth/whoami`, { withCredentials: true });
    return this.http.get<User>('./who.json');
  }

  logout() {
    return this.http.post(environment.apiBaseUrl + '/auth/logout', {}, { withCredentials: true });
  }

  loadPage(skip: number, limit: number): Observable<UsersPage> {
    return this.http.get<UsersPage>(environment.apiBaseUrl + `/users?skip=${skip}&limit=${limit}`, { withCredentials: true });
  }

  getById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(environment.apiBaseUrl + `/users/${id}`, { withCredentials: true });
  }

  update(user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(environment.apiBaseUrl + `/users/${user._id}`, user, { withCredentials: true });
  }

  create(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(environment.apiBaseUrl + `/users`, user, { withCredentials: true });
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.apiBaseUrl + `/user-roles-fill-select`, { withCredentials: true });
  }

  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.apiBaseUrl + `/user-profiles-fill-select`, { withCredentials: true });
  }

  gelRoleById(id: number): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(environment.apiBaseUrl + `/user-roles/${id}`, { withCredentials: true });
  }

  getProfileById(id: number): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(environment.apiBaseUrl + `/user-profiles/${id}`, { withCredentials: true });
  }

  delById(id: number): Observable<unknown> {
    return this.http.delete<unknown>(environment.apiBaseUrl + `/users/${id}`, { withCredentials: true });
  }

  setPass(id: number, pass: string): Observable<unknown> {
    return this.http.post<unknown>(environment.apiBaseUrl + `/users/${id}/password`, { _id: id, password: pass }, { withCredentials: true });
  }

  getProfile(id: number): Observable<TreeMenuNode[]> {
    return of(
      [
        {
          name: "Оперативні",
          icon: "",
          childNodes: [
            {
              childNodes: [],
              name: "Зберігання газу",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "dashboards/storagemap" }
            },
            {
              childNodes: [],
              name: "Обсяг вільн потужн",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/component4" }
            },
            {
              childNodes: [],
              name: "Комерційна панорама",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/commerse" }
            },
            {
              childNodes: [],
              name: "Порівняння споживання",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/component3" }
            },
            //....
          ],
          payload: {},
          expanded: false
        },

        {
          name: "Режими",
          icon: "",
          childNodes: [
            {
              childNodes: [],
              name: "Динаміка P",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/tovregim" }//dashboards/
            },
            {
              childNodes: [],
              name: "Показники роботи",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/tovregmap" }//dashboards/
            },
            {
              childNodes: [],
              name: "Тех-акт газ графік",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/actgascharts" }
            },
            {
              childNodes: [],
              name: "AGSI",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/agsi" }
            },
            {
              childNodes: [],
              name: "SCADA",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/scada" }
            },
            {
              childNodes: [],
              name: "Порівняння споживання",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/component3" }
            },
            {
              childNodes: [],
              name: "Погода карта",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/wheathermap" }
            },
            {
              childNodes: [],
              name: "Погода граф",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/wheathercharts" }
            },

          ],
          payload: {},
          expanded: false
        },

        {
          name: "Звіти",
          icon: "",
          childNodes: [
            {
              childNodes: [],
              name: "Сезони",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/seasonstats" }//dashboards/seasonstats
            },
            {
              childNodes: [],
              name: "ВТВ",
              icon: "bi-activity",
              expanded: false,
              payload: { routerLink: "/dashboards/fbgpic1" }
            },
          ],
          payload: {},
          expanded: false,
        },
        {
          name: "Документація",
          icon: "",
          childNodes: [

          ],
          payload: {},
          expanded: false,
        },
        {
          name: "Адміністрування",
          icon: "",
          childNodes: [
            {
              name: "Користувачі",
              icon: "",
              expanded: false,
              childNodes: [
                {
                  childNodes: [],
                  name: "Список",
                  icon: "bi-activity",
                  expanded: false,
                  payload: { routerLink: "/users/list" }
                },
              ]
            },
          ],
          payload: {},
          expanded: false
        },

      ]
    );
  }
}