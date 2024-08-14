import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AggregateResp } from '../models/aggregates';
import { GasStoreResp } from '../models/gas-stores';


 
@Injectable({ providedIn: 'root' })
export class AggregateGasStoreService {
  constructor(private http: HttpClient) {}
 
  getAllGasStoresState(iso_ts : string) {
    // return fetch('./gasstore.json').then(res => res.json()).then(data => data.data);
    return this.http.get<GasStoreResp>('./gasstore.json');
  }

  getAllAggregatesState(iso_ts : string) {
    // return fetch('./aggregates.json').then(res => res.json()).then(data => data.data);
    return this.http.get<AggregateResp>('./aggregates.json');
  }

}