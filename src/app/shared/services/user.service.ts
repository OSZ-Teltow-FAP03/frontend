import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_TOKEN } from '../api-token';
import { Page, PageRequest } from '../pagination/pagination';
import { User } from '../interfaces/user';
import { PROD_TOKEN } from '../production';
import { Observable, of, take, map, Subject } from 'rxjs';
import { Query } from '../interfaces/query';
import { compare } from '../functions/compare';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = new Subject<Array<User>>();

  constructor(
    @Inject(API_TOKEN) private readonly api: string,
    @Inject(PROD_TOKEN) private readonly prod: boolean,
    private readonly http: HttpClient
  ) {
    this.getAllUsers().subscribe(val => this.users$.next(val));
  }

  userApi = `${this.api}/users`;

  getAllUsers() {
    return this.http.get<Array<User>>(`${this.userApi}/list`, {
      withCredentials: true,
    });
  }

  refresh() {
    this.getAllUsers().subscribe(val => this.users$.next(val));
  }

  updateUserRole(id: number, role: string | undefined): Observable<User> {
    return this.http.patch<User>(`${this.userApi}/updateRole`, {
      UserID: id,
      role: role,
    });
  }

  getUserById(id: number) {
    const params = new HttpParams();
    params.set('UserID', id);

    return this.http.get<User>(`${this.userApi}/get`, {
      params: params,
    });
  }

  deletUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.userApi}/delete`, {
      body: { UserID: id },
    });
  }

  page(request: PageRequest, query: Query): Observable<Page<User>> {
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
              return compare(a.ID, b.ID, isAsc);
            case 'email':
              return compare(a.email, b.email, isAsc);
            case 'username':
              return compare(a.username, b.username, isAsc);
            case 'role':
              if (typeof a.role === 'string' && typeof b.role === 'string') {
                return compare(a.role, b.role, isAsc);
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
}
