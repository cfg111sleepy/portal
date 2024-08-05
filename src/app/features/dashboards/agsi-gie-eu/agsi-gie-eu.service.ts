import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AgsiApiResp } from './agsi-gie-eu.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgsiGieEuService {

  constructor(private http: HttpClient) { }

  loadGasDay(date:string) : Observable<AgsiApiResp> {
    return this.http.get<AgsiApiResp>(environment.agsiApiBaseUrl + `?date=${date}`);
  }

  loadGasDayLastYear(date:string) : Observable<AgsiApiResp> {
    const lastY = new Date(date);
    lastY.setFullYear(lastY.getFullYear() - 1);
    let sDate = lastY.toISOString().substring(0,10);

    return this.http.get<AgsiApiResp>(environment.agsiApiBaseUrl + `?date=${sDate}`);
  }

  loadDaysHistory(from:string, to:string, code:string) : Observable<AgsiApiResp> {
    if (code != "eu")
      return this.http.get<AgsiApiResp>(environment.agsiApiBaseUrl + `?country=${code}&from=${from}&to=${to}&page=1&size=3000`);
    else
      return this.http.get<AgsiApiResp>(environment.agsiApiBaseUrl + `?continent=eu&from=${from}&to=${to}&page=1&size=3000`);
  }

}
