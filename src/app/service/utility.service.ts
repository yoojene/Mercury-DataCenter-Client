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

  // Add zero for month or date number
  private checkZeroForDateNum(num: number): String {
    let result = ''
    let str = String(num)
    switch (str.length) {
      case 1:
        result = '0' + str
        break;
      case 2:
        result = str
        break;
    }
    return result
  }

  generateID(tableName: String) {
    let result = `${tableName}-${this.getCurrentDatetime()}${this.getRandomNum()}`
    return result
  }

  formatDate(dateObj: MyDate): String {
    return `${dateObj.year}-${this.checkZeroForDateNum(dateObj.month + 1)}-${this.checkZeroForDateNum(dateObj.date)}`
  }
}
