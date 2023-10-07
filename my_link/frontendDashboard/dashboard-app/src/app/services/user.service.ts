// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getListUser() {
    return this.http.get(this.URL_BASE + '/users')
  }

  getUserById(id: any, role: string) {
    const data = { role }
    return this.http.post(this.URL_BASE + '/users/' + id, data); 
  }

  getTotalUsersToday() {
    return this.http.get(this.URL_BASE + '/total-users');
  }

  updateUser(userIdRole: string, data: any) {
    return this.http.post(this.URL_BASE + '/users/update/' + userIdRole, data);
  }

  changeStatusAccount(idUser: any, isEnabled: any) {
    const data = { idUser, isEnabled };
    return this.http.post(this.URL_BASE + '/users/change-status', data);
  }
}
