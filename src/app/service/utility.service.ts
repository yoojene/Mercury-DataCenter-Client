import { Injectable } from '@angular/core';
import * as moment from "moment";
import { MyDate } from "../module/MyDate";


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  test() {
    console.log('test')
    return 'test'
  }

  private getCurrentDatetime() {
    let result = moment().format('YYYYMMDDHHmmsssss')
    return result
  }

  private getRandomNum() {
    let num = String(Math.random().toFixed(4))
    let result = num.split('.')[1]
    return result
  }

  generateID(tableName: String) {
    let result = `${tableName}-${this.getCurrentDatetime()}${this.getRandomNum()}`
    return result
  }

  formatDate(dateObj: MyDate): String {
    return `${dateObj.year}-${dateObj.month}-${dateObj.date}`
  }
}
