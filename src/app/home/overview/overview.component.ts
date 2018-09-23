import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [100, 29, 35, 432, 4, 13, 524, 543, 6, 536, 356, 54, 745]
    }]
  });

  constructor() { }

  ngOnInit() {
  }

}
