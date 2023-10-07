import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatisticsService } from 'src/app/services/statistics.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-driver',
  templateUrl: './top-driver.component.html',
  styleUrls: ['./top-driver.component.scss']
})
export class TopDriverComponent {
  currentRate: number = 4.5;
  subscription: Subscription = new Subscription();
  listDriverTops: any = [];

  listTopsIn3: any = [];
  listTopsLeft: any = [];

  constructor(private statisticsService: StatisticsService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.handleGetData();
  }

  handleGetData() {
    this.subscription = this.statisticsService.getTop10Drivers().subscribe((res: any) => {
      console.log(res.data)
      if(res.message === 'ok') {
        this.listDriverTops = res.data.map((item: any) => {
          return { ...item, total_rating: Number(item.total_rating), point: Number(Number(item.sum_cost / 1000).toFixed(2)) };
        });

        this.listDriverTops.forEach((item: any, index: number) => {
          if(index < 3) {
            this.listTopsIn3.push(item);
          } else {
            this.listTopsLeft.push(item);
          }
        })
  
        console.log(this.listTopsIn3);
        console.log(this.listTopsLeft);
      } else {
        this.toastrService.error(res.message);
      }
      this.listDriverTops = res.data;
    }, (error: any) => {
      this.toastrService.error(error);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
