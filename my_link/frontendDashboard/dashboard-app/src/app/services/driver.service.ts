// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getListDrivers() {
    return this.http.get(this.URL_BASE + '/drivers');
  }

  getTotalDrivers() {
    return this.http.get(this.URL_BASE + '/drivers/total');
  }

  getTotalDriversEachMonth() {
    return this.http.get(this.URL_BASE + '/drivers/total/months')
  }

  updateDriver(data: any) {
    const formatData = {
      id: data.ID,
      username: data.Username,
      email: data.Email,
      phoneNumber: data['SĐT'],
      fullName: data['Họ và tên'],
      address: data['Địa chỉ']
    }
    return this.http.post(this.URL_BASE + '/drivers/update', data);
  }

  deleteDriver(idDriver: number, idUser: number) {
    const data = {};
    return this.http.post(this.URL_BASE + '/drivers/delete/' + idDriver + '/' + idUser, data);
  }
}
