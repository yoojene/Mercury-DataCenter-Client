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
  host = "http://localhost/MercuryDataCenterServer/"

  constructor(private http: HttpClient) { }

  greet(url) {
    return this.http.get(this.host + url)
  }

  saveNewDataAPI(tableName, data) {
    return this.http.post(this.host + 'api/add/' + tableName, data, httpOptions)
  }

  fetchAllMetaData() {
    return this.http.get(this.host + 'get-meta-data')
  }

}
