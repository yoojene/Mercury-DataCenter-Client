import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Chart } from 'angular-highcharts';
import { Hotel } from "../../module/Hotel";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  hotelsData: any
  providerChart: Chart
  providerTable: any

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.fetchAllByTableName('hotels').subscribe(
      (response: PostResponse) => {
        console.log(response)
        this.hotelsData = response.msg
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
    this.hotelsData.forEach((element: Hotel) => {
      tempProviderArr.push(element.name)
    });
    let providerArr = Array.from(new Set(tempProviderArr))
    providerArr.forEach(element => {
      let obj = {
        name: element,
        y: this.hotelsData.filter(function (value) {
          return value.name == element
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
