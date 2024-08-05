import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AggregateResp } from '../models/aggregates';
import { GasStoreResp } from '../models/gas-stores';


 
@Injectable({ providedIn: 'root' })
export class AggregateGasStoreService {
  constructor(private http: HttpClient) {}
 
  getAllGasStoresState(iso_ts : string): Observable<GasStoreResp> {
    return this.http.get<GasStoreResp>(environment.apiBaseUrl + `/gasstores?time_stamp=${iso_ts}&limit=150`, { withCredentials: true });
  }

  getAllAggregatesState(iso_ts : string): Observable<AggregateResp> {
    return this.http.get<AggregateResp>(environment.apiBaseUrl + `/aggregates?time_stamp=${iso_ts}&limit=150`, { withCredentials: true });
  }

}