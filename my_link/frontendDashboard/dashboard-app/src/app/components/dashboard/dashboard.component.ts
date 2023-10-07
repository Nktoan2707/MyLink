import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { StatisticsService } from 'src/app/services/statistics.service';
import { UserService } from 'src/app/services/user.service';
import { DriverService } from 'src/app/services/driver.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private subscriptions: Subscription[] = [];

  data_header: any = {
    revenueToday: 0,
    newUsers: 0,
    totalEmployees: 0,
    totalDrivers: 0,
  };

  labelsChartX: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  dataSetsChartBar: any;

  dataSetsChartBarAndLine: any;

  backgroundColors = ['#fbc02e', '#4bdec0', '#ff6f87', '#61abfe'];
  labelsChartPie = ['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'];

  dataPieChart: any;

  constructor(
    private statisticsService: StatisticsService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private driverService: DriverService,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getDataHeader();
    this.getDataSetsChartBar();
    this.getDataSetsChartBarAndLine();
    this.getDataPieChart();
  }

  getDataHeader() {
    let subscription: Subscription = this.statisticsService
      .getRevenueToday()
      .subscribe(
        (res: any) => {
          if (res.message === 'ok') {
            this.data_header.revenueToday = Number(
              Number(res.data / 1000).toFixed(2)
            );
          } else {
            this.toastrService.error(res.message);
          }
        },
        (error: any) => {
          this.toastrService.error(error);
        }
      );

    this.subscriptions.push(subscription);

    subscription = this.userService.getTotalUsersToday().subscribe(
      (res: any) => {
        if (res.message === 'ok') {
          this.data_header.newUsers = res.data;
        } else {
          this.toastrService.error(res.message);
        }
      },
      (error: any) => {
        this.toastrService.error(error);
      }
    );

    this.subscriptions.push(subscription);

    subscription = this.employeeService.getTotalEmployees().subscribe(
      (res: any) => {
        if (res.message === 'ok') {
          this.data_header.totalEmployees = res.data.total_employees;
        } else {
          this.toastrService.error(res.message);
        }
      },
      (error: any) => {
        this.toastrService.error(error);
      }
    );

    this.subscriptions.push(subscription);

    subscription = this.driverService.getTotalDrivers().subscribe(
      (res: any) => {
        console.log(res)
        if (res.message === 'ok') {
          this.data_header.totalDrivers = res.data.total_drivers;
        } else {
          this.toastrService.error(res.message);
        }
      },
      (error: any) => {
        this.toastrService.error(error);
      }
    );

    this.subscriptions.push(subscription);
  }

  getDataSetsChartBar() {
    const dataDriver: any = [];
    const dataCustomer: any = [];

    let subscription: Subscription = this.driverService.getTotalDriversEachMonth().subscribe((res: any) => {
      if(res.message === 'ok') {
        for(let i = 1; i <= 12; i++) {
          dataDriver.push(res.results[i])
        }
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
    this.subscriptions.push(subscription);

    subscription = this.customerService.getTotalCustomersEachMonth().subscribe((res: any) => {
      if(res.message === 'ok') {
        for(let i = 1; i <= 12; i++) {
          dataCustomer.push(res.results[i])
        }
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
    this.subscriptions.push(subscription);

    this.dataSetsChartBar = [
      {
        label: 'Tài xế',
        data: dataDriver,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#6d6d6d',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Khách hàng',
        data: dataCustomer,
        backgroundColor: '#ff6f87',
        borderColor: '#6d6d6d',
        borderWidth: 1,
        type: 'bar',
      },
    ];
  }

  getDataSetsChartBarAndLine() {
    const dataCustomer: any = [];
    const dataRevenue: any = [];

    let subscription: Subscription = this.customerService.getTotalCustomersEachMonth().subscribe((res: any) => {
      if(res.message === 'ok') {
        for(let i = 1; i <= 12; i++) {
          dataCustomer.push(res.results[i])
        }
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
    this.subscriptions.push(subscription);

    subscription = this.statisticsService.totalRevenuesEachMonth().subscribe((res: any) => {
      if(res.message === 'ok') {
        for(let i = 1; i <= 12; i++) {
          dataRevenue.push(res.results[i]);
        }
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
    this.subscriptions.push(subscription);

    this.dataSetsChartBarAndLine = [
      {
        label: 'Khách hàng',
        data: dataCustomer,
        backgroundColor: '#4bdec0',
        borderColor: '#6d6d6d',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Doanh thu',
        data: dataRevenue,
        borderColor: '#548aeb',
        borderWidth: 1,
        type: 'line',
      },
    ];
  }

  getDataPieChart() {
    let subscription: Subscription = this.statisticsService.totalRevenuesEachCities().subscribe((res: any) => {
      console.log(res);
      if(res.message === 'ok') {
        this.dataPieChart = {
          labels: res.labels,
          datasets: [
            {
              label: 'Số lượng khách hàng',
              data: res.data,
              backgroundColor: this.backgroundColors,
              hoverOffset: 4,
              type: 'pie',
            },
          ],
        };
      } else {
        this.toastrService.error(res.message);
      }
    }, (error: any) => {
      this.toastrService.error(error);
    })
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
