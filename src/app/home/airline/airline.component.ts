import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Chart } from 'angular-highcharts';
import { Airline } from "../../module/Airline";
import { DownloadService } from '../../service/download.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
})
export class AirlineComponent implements OnInit {
  airlinesData: any;
  providerChart: Chart;
  providerTable: any;

  constructor(
    private httpService: HttpService,
    public downloadService: DownloadService) {}

  ngOnInit() {
    this.httpService.fetchAllByTableName('airlines').subscribe(
      (response: PostResponse) => {
        this.airlinesData = response.msg;
        this.statisticsProvider();
      },
      error => {
        console.log(error);
      }
    );
  }

  statisticsProvider() {
    let data = [];
    let tempProviderArr = [];
    this.airlinesData.forEach((element: Airline) => {
      tempProviderArr.push(element.name);
    });
    // console.log(tempProviderArr)
    let providerArr = Array.from(new Set(tempProviderArr));
    // console.log(providerArr)
    providerArr.forEach(element => {
      let obj = {
        name: element,
        y: this.airlinesData.filter(function(value) {
          return value.name == element;
        }).length,
      };
      data.push(obj);
    });

    this.providerTable = data;
    let providerOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'The Provider of Airline, 2018',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Pie',
          colorByPoint: true,
          data: data,
        },
      ],
    };

    this.providerChart = new Chart(providerOptions);
  }

  doDownloadFile() {
    this.downloadService.downloadFile();
  }
}
