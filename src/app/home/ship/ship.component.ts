import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Chart } from 'angular-highcharts';
import { Ship } from "../../module/Ship";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {

  shipsData: any
  providerChart: Chart
  providerTable: any

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.fetchAllByTableName('ships').subscribe(
      (response: PostResponse) => {
        this.shipsData = response.msg
        this.statisticsProvider()
      },
      error => {
        console.log(error)
      }
    )
  }

  statisticsProvider() {
    let data = []
    let tempProviderArr = []
    this.shipsData.forEach((element: Ship) => {
      tempProviderArr.push(element.provider)
    });
    let providerArr = Array.from(new Set(tempProviderArr))
    providerArr.forEach(element => {
      let obj = {
        name: element,
        y: this.shipsData.filter(function (value) {
          return value.provider == element
        }).length
      }
      data.push(obj)
    });

    this.providerTable = data
    let providerOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'The Provider of Hotel, 2018'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          }
        }
      },
      series: [{
        name: 'Pie',
        colorByPoint: true,
        data: data
      }]
    }

    this.providerChart = new Chart(providerOptions)

  }

}
