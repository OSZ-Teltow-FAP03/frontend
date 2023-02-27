import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_TOKEN } from '../api-token';
import { Page, PageRequest } from '../pagination/pagination';
import { User, UserQuery } from '../interfaces/user';
import { PROD_TOKEN } from '../production';
import { Observable, of, take, map } from 'rxjs';
import { testUsers } from 'src/app/test-data/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    private readonly http: HttpClient
  ) {}

  userApi = `${this.api}/users`;

  getAllUsers() {
    if (this.prod === false) {
      return of(testUsers);
    }
    return this.http.get<Array<User>>(`${this.userApi}/list`);
  }

  updateUserRole(id: number, role: string | undefined): Observable<User> {
    if (this.prod === false) {
      const user = testUsers.find(x => x.ID === id);
      if (user !== undefined) {
        user.role = role;
        return of(user);
      }
      return of({
        ID: 1,
        name: 'Thorsten',
        email: 'Thorsten@gmail.com',
        lastname: 'Meier',
        username: 'tmera',
      });
    }
    return this.http.patch<User>(`${this.userApi}/updateRole`, {
      UserID: id,
      role: role,
    });
  }

  getUserById(id: number) {
    if (this.prod === false) {
      const user = testUsers.find(x => x.ID === id);
      if (user !== undefined) {
        return of(user);
      }
      return of({
        ID: 1,
        name: 'Thorsten',
        email: 'Thorsten@gmail.com',
        lastname: 'Meier',
        username: 'tmera',
      });
    }
    const params = new HttpParams();
    params.set('UserID', id);

    return this.http.get<User>(`${this.userApi}/get`, {
      params: params,
    });
  }

  deletUser(id: number): Observable<boolean> {
    if (this.prod === false) {
      return of(true);
    }
    return this.http.delete<boolean>(`${this.userApi}/delete`, {
      body: { UserID: id },
    });
  }

  page(request: PageRequest, query: UserQuery): Observable<Page<User>> {
    return this.getAllUsers().pipe(
      take(1),
      map(users => {
        if (query.search.length > 0) {
          users = users.filter(
            user =>
              user.ID.toString()
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              user.email.toLowerCase().includes(query.search.toLowerCase()) ||
              user.lastname
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              user.name.toLowerCase().includes(query.search.toLowerCase()) ||
              user.username
                .toLowerCase()
                .includes(query.search.toLowerCase()) ||
              user.role?.toLowerCase().includes(query.search.toLowerCase())
          );
        }
        return users;
      }),
      map(users => {
        const sort = request.sort;
        return users.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'ID':
              return this.compare(a.ID, b.ID, isAsc);
            case 'email':
              return this.compare(a.email, b.email, isAsc);
            case 'username':
              return this.compare(a.username, b.username, isAsc);
            case 'role':
              if (typeof a.role === 'string' && typeof b.role === 'string') {
                return this.compare(a.role, b.role, isAsc);
              }
              return 0;
            default:
              return 0;
          }
        });
      }),
      map(users => {
        return {
          content: users,
          number: request.page,
          size: request.size,
          totalElements: users.length,
        };
      }),
      map(page => {
        page.content = page.content.slice(
          request.page * request.size,
          request.page * request.size + request.size
        );
        return page;
      })
    );
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
