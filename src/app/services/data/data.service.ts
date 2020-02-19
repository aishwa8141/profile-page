import { Injectable } from '@angular/core';
import { ServerResponse } from '../../interfaces/serverResponse'
import { HttpOptions } from '../../interfaces/httpOptions'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { mergeMap } from 'rxjs/operators';
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.baseUrl = "https://devcon.sunbirded.org/api/regutil/visitor/display";
  }

  post(requestParam: any): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param,
      observe: 'response'

    };
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap(({ body, headers }: any) => {
        if (body.responseCode !== 'OK') {
          return observableThrowError(body);
        }
        return observableOf(body);
      }));
  }

/**
   * for making get api calls
   *
   * @param requestParam interface
   */
  get(requestParam: any): Observable<any> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ?  this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.get(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: any) => {
        return observableOf(data);
      }));
  }

  private getHeader(headers?: any) {
    const default_headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZWU4YTgxNDNiZWE0NDU4YjQxMjcyNTU5ZDBhNTczMiJ9.7m4mIUaiPwh_o9cvJuyZuGrOdkfh0Nm0E_25Cl21kxE",
      'Access-Control-Allow-Origin': '*',
    }
    return { ...default_headers };
  }
}
