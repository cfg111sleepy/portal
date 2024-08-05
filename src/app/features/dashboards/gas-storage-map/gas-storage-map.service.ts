import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NsiPacket, OpDataPacket, StatPacket } from './gas-storage-map.models';


 
@Injectable({ providedIn: 'root' })
export class GasStorageMapService {
  constructor(private http: HttpClient) {}
 
  get(url:string, tsIso: string): Observable<OpDataPacket> {
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `${url}?gasday=${tsIso}`, { withCredentials: true });
  }

  getRange(url:string, from: string, to:string): Observable<OpDataPacket> {
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `${url}?from=${from}&to=${to}`, { withCredentials: true });
  }

  getTable(objects:number[], parameters:number[], from: string, to:string): Observable<OpDataPacket> {
    let o = JSON.stringify(objects);
    let p = JSON.stringify(parameters);
    return this.http.get<OpDataPacket>(environment.apiBaseUrl + `/table?objects=${o}&parameters=${p}&from=${from}&to=${to}`, { withCredentials: true });
  }

  getStatistics(objects:number[], parameters:number[], from: string, to:string): Observable<StatPacket> {
    let o = JSON.stringify(objects);
    let p = JSON.stringify(parameters);
    return this.http.get<StatPacket>(environment.apiBaseUrl + `/stats?objects=${o}&parameters=${p}&from=${from}&to=${to}`, { withCredentials: true });
  }

  getNsiByObject(object:string): Observable<NsiPacket> {
    return this.http.get<NsiPacket>(environment.apiBaseUrl + `/nsi?object=${object}`, { withCredentials: true });
  }

  getExcel(objects:number[], parameters:number[], from: string, to:string) : Observable<any> { 
    let obj = JSON.stringify(objects);
    let params = JSON.stringify(parameters);
        
    return this.http.get(`${environment.apiBaseUrl}/excell?from=${from}&to=${to}&objects=${obj}&parameters=${params}`, 
      { responseType:'blob' as 'json', observe: 'response', withCredentials: true} );
  }
}