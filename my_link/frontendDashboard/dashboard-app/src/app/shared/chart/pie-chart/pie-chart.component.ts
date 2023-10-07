import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() chartData: any;

  ngOnInit() {
    this.register();
  }
  // Register the plugin to all charts:
  register() {
    Chart.register(ChartDataLabels);
  }

  public chartOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce(
            (previousValue: any, currentValue: any) =>
              previousValue + currentValue
          );
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2);
          return `${
            this.chartData.labels[tooltipItem.index]
          }: ${currentValue} (${percentage}%)`;
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };
}
