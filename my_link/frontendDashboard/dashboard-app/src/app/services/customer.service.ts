// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getListCustomers() {
    return this.http.get(this.URL_BASE + '/customers');
  }

  getTotalDrivers() {
    return this.http.get(this.URL_BASE + '/customers/total');
  }

  getTotalCustomersEachMonth() {
    return this.http.get(this.URL_BASE + '/customers/total/months')
  }

  updateCustomer(data: any) {
    const formatData = {
      id: data.ID,
      username: data.Username,
      email: data.Email,
      phoneNumber: data['SĐT'],
      fullName: data['Họ và tên'],
      address: data['Địa chỉ']
    }
    return this.http.post(this.URL_BASE + '/customers/update', data);
  }

  deleteCustomer(idCustomer: number, idUser: number) {
    const data = {};
    return this.http.post(this.URL_BASE + '/customers/delete/' + idCustomer + '/' + idUser, data);
  }
}
