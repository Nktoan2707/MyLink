import { Router } from '@angular/router';
// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_BASE = 'http://localhost:8081/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private store: Store ) {}

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post(this.URL_BASE + '/signin', data).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          console.log(response)
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.store.dispatch(loginSuccess({ user: response }));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  changePassword(data: any) {
    return this.http.post(this.URL_BASE + '/user/change-password', data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.store.dispatch(logout());
    window.location.reload();
  }

  signup(data: any) {
    console.log(data)
    return this.http.post(this.URL_BASE + '/signup', data);
  }
}
