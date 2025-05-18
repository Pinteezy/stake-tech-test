import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { API_BASE_URL } from '../../tokens/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[] | null>(null);
  users$ = this.usersSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string
  ) {}

  fetchUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      tap((users) => this.usersSubject.next(users)),
      catchError((error) => {
        console.error('Failed to fetch users', error);
        this.usersSubject.next(null);
        return throwError(() => error);
      })
    );
  }

  getUsers(): Observable<User[]> {
    if (this.usersSubject.value) {
      return this.users$ as Observable<User[]>;
    } else {
      return this.fetchUsers();
    }
  }
}
