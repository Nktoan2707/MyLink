import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() chartLabels: any;
  @Input() chartData: any;

  public chartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Set beginAtZero to true to start the scale at 0,
          },
        },
      ]
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      datalables: {
        font: {
          width: 'bold',
        },
        textAlign: 'center',
      }
    },

  };
  public chartLegend = true;

  constructor() {}

  ngOnInit() {
    console.log(this.chartLabels)
  }
}
