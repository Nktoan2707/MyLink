// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private URL_BASE = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getTop10Drivers() {
    return this.http.get(this.URL_BASE + '/statistics/driver-tops')
  }

  getStatisticsFromDateToDate(data: any) {
    return this.http.post(this.URL_BASE + '/statistics/revenue', data)
  }

  getRevenueToday() {
    return this.http.get(this.URL_BASE + '/statistics/revenue/today')
  }

  totalRevenuesEachMonth() {
    return this.http.get(this.URL_BASE + '/statistics/revenue/total/months')
  }

  totalRevenuesEachCities() {
    return this.http.get(this.URL_BASE + '/statistics/revenue/total/cites');
  }
}
