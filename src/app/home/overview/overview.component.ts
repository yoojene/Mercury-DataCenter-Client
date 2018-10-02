import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Tables } from "../../module/Tables";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  countList = []
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.fetchAllTables()
      .subscribe(
        (response: PostResponse) => {
          // console.log(Tables.values)
          Tables.values = response.msg
          this.initCountList()
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
    console.log(this.countList)
  }

}
