// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getListAdmins() {
    return this.http.get(this.URL_BASE + '/admins');
  }

  getTotalAdmins() {
    return this.http.get(this.URL_BASE + '/admins/total');
  }

  updateAdmin(data: any) {
    const formatData = {
      id: data.ID,
      username: data.Username,
      email: data.Email,
      phoneNumber: data['SĐT'],
      fullName: data['Họ và tên'],
      address: data['Địa chỉ']
    }
    return this.http.post(this.URL_BASE + '/admins/update', data);
  }

  deleteAdmin(idAdmin: number, idUser: number) {
    const data = {};
    return this.http.post(this.URL_BASE + '/admins/delete/' + idAdmin + '/' + idUser, data);
  }
}
