import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";

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
    this.httpService.countDataAPI('all').subscribe(
      (response: PostResponse) => {
        console.log(response)
        console.log(response.msg)
        for (const key in response.msg) {
          if (response.msg.hasOwnProperty(key)) {
            this.countList.push({
              tableName: key,
              value: response.msg[key]
            })
          }
        }
        console.log(this.countList)
      }
    )
  }

}
