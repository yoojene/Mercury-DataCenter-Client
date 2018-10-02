import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, URLSearchParams } from '@angular/http'
import { Observable, throwError, ObservableLike } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host = "http://localhost/MercuryDataCenterServer/api/"

  constructor(private http: HttpClient) { }

  greet(url) {
    return this.http.get(this.host + url)
  }

  saveNewDataAPI(tableName, data) {
    return this.http.post(this.host + 'add/' + tableName, data, httpOptions)
  }

  countDataAPI(tableName) {
    return this.http.get(this.host + 'count/' + tableName, httpOptions)
  }

  fetchAllMetaData() {
    return this.http.get(this.host + 'get-meta-data')
  }

  fetchAllTables() {
    return this.http.get(this.host + 'fetch-all')
  }

  fetchAllByTableName(tableName) {
    return this.http.get(this.host + 'fetch-all/' + tableName)
  }

  postAllMetaData(data) {
    return this.http.post(this.host + 'update-meta-data', data, httpOptions)
  }

}
