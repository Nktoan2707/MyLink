// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getListEmployees() {
    return this.http.get(this.URL_BASE + '/employees');
  }

  getTotalEmployees() {
    return this.http.get(this.URL_BASE + '/employees/total');
  }

  updateEmployee(data: any) {
    const formatData = {
      id: data.ID,
      username: data.Username,
      email: data.Email,
      phoneNumber: data['SĐT'],
      fullName: data['Họ và tên'],
      address: data['Địa chỉ']
    }
    return this.http.post(this.URL_BASE + '/employees/update', data);
  }

  deleteEmployee(idEmployee: number, idUser: number) {
    const data = {};
    return this.http.post(this.URL_BASE + '/employees/delete/' + idEmployee + '/' + idUser, data);
  }
}
