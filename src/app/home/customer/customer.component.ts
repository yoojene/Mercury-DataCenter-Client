import { Component, OnInit } from '@angular/core';
import { Tables } from "../../module/Tables";
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Customer } from "../../module/Customer";
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customersData: any
  nationalityChart: Chart
  nationalityTable: any

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.fetchAllByTableName('customers').subscribe(
      (response: PostResponse) => {
        this.customersData = response.msg
        this.statisticsNationality()
      },
      error => {
        console.log(error)
      }
    )

  }

  statisticsNationality() {
    let data = []
    let tempNationalityArr = []
    // get nationality info, but has duplicate value
    this.customersData.forEach((element: Customer) => {
      tempNationalityArr.push(element.nationality)
    });
    // remove repeat value from nationality array
    let nationalityArr = Array.from(new Set(tempNationalityArr))
    nationalityArr.forEach(element => {
      let obj = {
        name: element,
        y: this.customersData.filter(function (value) {
          return value.nationality == element
        }).length
      }
      data.push(obj)
    });

    this.nationalityTable = data

    let nationalityOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'The Nationality of Customers, 2018'
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



    this.nationalityChart = new Chart(nationalityOptions)

  }

}
