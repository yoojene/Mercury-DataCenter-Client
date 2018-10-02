import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Tables } from "../../module/Tables";
import { GlobalDefault } from "../../module/GlobalDefault";
import { UtilityService } from "../../service/utility.service";
import * as moment from 'moment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  countList = []
  growthTrendTableData: any
  months = GlobalDefault.months
  growthTrendChart: any
  growthTrendOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: `Monthly Growth Trend ${moment().year()}`
    },
    subtitle: {
      text: '依照每月登记的订单统计'
    },
    xAxis: {
      categories: GlobalDefault.months
    },
    yAxis: {
      title: {
        text: 'Number of Order'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true
      }
    },
    series: []
  }

  constructor(
    private httpService: HttpService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.httpService.fetchAllTables()
      .subscribe(
        (response: PostResponse) => {
          // Set the global variable
          Tables.values = response.msg
          this.initCountList()
          this.generateGrowthTrendChart()
        },
        error => {
          console.log(error)
        }
      )
  }

  initCountList() {
    for (const key in Tables.values) {
      if (Tables.values.hasOwnProperty(key)) {
        const elementArr = Tables.values[key];
        this.countList.push({
          tableName: key,
          count: elementArr.length
        })
      }
    }
  }

  statisticsMonthly() {
    let tableNames = Tables.tables
    let datas = []

    tableNames.forEach(tableName => {
      let obj = {
        name: tableName,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      let arr = Tables.values[tableName]
      arr.forEach((element, index) => {
        let month = this.utilityService.getYearMonthDayFromID(element.id).month
        obj.data[month - 1] += 1
      });
      datas.push(obj)
    });
    this.growthTrendTableData = datas
    return datas
  }

  generateGrowthTrendChart() {
    this.growthTrendOptions.series = this.statisticsMonthly()
    this.growthTrendChart = new Chart(this.growthTrendOptions)
  }

}
