import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GeneralService } from 'src/app/services/general.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.scss'],
})
export class RevenueReportComponent {
  subscription: Subscription = new Subscription();
  tableContent: any = [];
  tableContentCopy: any = [];
  tableConfig: any = [];
  startDateValue: any = null;
  endDateValue: any = null;
  colors: any = ['#f8f0f0', '#fff'];

  dataChart: any = [];

  dates: any = [];
  data: any = [
    {
      city: 'Hồ Chí Minh',
      type: 'Số lượng KH',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Hồ Chí Minh',
      type: 'Doanh thu',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Hà Nội',
      type: 'Số lượng KH',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Hà Nội',
      type: 'Doanh thu',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Đà Nẵng',
      type: 'Số lượng KH',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Đà Nẵng',
      type: 'Doanh thu',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Cần Thơ',
      type: 'Số lượng KH',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
    {
      city: 'Cần Thơ',
      type: 'Doanh thu',
      '2023-01-01': 8,
      '2023-01-02': 7,
      '2023-01-03': 1,
      '2023-01-10': 2,
    },
  ];

  constructor(
    private generalService: GeneralService,
    private statisticsService: StatisticsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {}

  getTableData() {
    this.getDates();

    const fromDate = this.generalService.formatDateToYYYYMMDD(
      this.startDateValue
    );
    const toDate = this.generalService.formatDateToYYYYMMDD(this.endDateValue);

    this.subscription = this.statisticsService
      .getStatisticsFromDateToDate({ fromDate, toDate })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.message === 'ok') {
            let indexColor = 0;
            let countToChangeColor = 0;

            this.tableContent = res.data.map((item: any) => {
              // Change color
              countToChangeColor++;
              if (countToChangeColor < 3) {
                indexColor = 1;
              } else if (countToChangeColor >= 3) {
                indexColor = 0;

                if (countToChangeColor === 4) {
                  countToChangeColor = 0;
                }
              }

              const obj: any = {
                'Thành phố': item.city,
                'Loại báo cáo': item.type,
                Color: this.colors[indexColor],
              };

              this.dates.forEach((date: string) => {
                obj[date] = 0;

                if (item[date]) {
                  obj[date] += item[date];
                }
              });

              return obj;
            });

            this.tableConfig = ['Thành phố', 'Loại báo cáo', ...this.dates].map(
              (heading: string) => {
                return {
                  title: heading,
                  dataField: heading,
                };
              }
            );

            this.getDataChart();
          } else {
            this.toastrService.error(res.message);
          }
        },
        (error: any) => {
          this.toastrService.error(error);
        }
      );
  }

  createArrayOfDates(fromDate: string, toDate: string) {
    const dates = [];
    const start = new Date(fromDate);
    const end = new Date(toDate);

    let current = new Date(start);

    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  getDataChart() {
    console.log(this.tableContent)
    //Lặp qua từng ngày - outer forEach
    // Lặp qua từng thành phố // Lọc theo: Số lượng khách hàng và Doanh thu
    const arrNumberCustomers: any = [];
    const arrRevenues: any = [];

    this.dates.forEach((date: string) => {
      let sumNumberCustomersEachCity = 0;
      let sumRevenueEachCity = 0;

      this.tableContent.forEach((cityItem: any) => {
        if (cityItem['Loại báo cáo'] === 'SL Khách hàng') {
          sumNumberCustomersEachCity += cityItem[date];
          console.log(sumNumberCustomersEachCity)
        } else if (cityItem['Loại báo cáo'] === 'Doanh thu') {
          sumRevenueEachCity += cityItem[date];
        }
      });

      arrNumberCustomers.push(sumNumberCustomersEachCity);
      arrRevenues.push(sumRevenueEachCity);
    });

    this.dataChart = ['SL Khách hàng', 'Doanh thu'].map((type: any) => {
      let data: any = [];

      if (type === 'SL Khách hàng') {
        data = arrNumberCustomers;
      } else if (type === 'Doanh thu') {
        data = arrRevenues;
      }

      return {
        label: type,
        data: data,
        type: 'bar',
      };
    });
  }

  getTableDataAndDataChart() {
    this.getTableData();
  }

  handleExportExcel() {
    const dataExport = this.tableContent.map((item: any) => {
      const { Color, ...data } = item;
      return data;
    });
    this.generalService.exportExcel(dataExport, 'bao_cao_doanh_thu_theo_ngay');
  }

  getDates() {
    const startDate = this.generalService.formatDateToYYYYMMDD(
      this.startDateValue
    );
    const toDate = this.generalService.formatDateToYYYYMMDD(this.endDateValue);
    this.dates = this.createArrayOfDates(startDate, toDate);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
