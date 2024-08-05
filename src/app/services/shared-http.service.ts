import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActGasSeasonPacket, PsgNsi } from '../models/season-act-gas';


 
@Injectable({ providedIn: 'root' })
export class SharedHttpService {
  constructor(private http: HttpClient) {}
 
  getActGasSeasons(object : number): Observable<ActGasSeasonPacket> {
    return this.http.get<ActGasSeasonPacket>(environment.apiBaseUrl + `/actgas-seasons?from=2018-01-01T00:00:00Z&to=2053-01-01T00:00:00Z&objects=[${object}]&parameters=[452]`, { withCredentials: true });
  }

  getAllPsgNSI() : Observable<PsgNsi[]> {
    return of([
      {object: 7000001, name:"ПСГ УТГ"},
      {object: 906024, name:"ПСГ Більче-Волицько-Угерське"},
      {object: 906035, name:"ПСГ Б-В-Угерське -> Більче-Волицький поклад"},
      {object: 906026, name:"ПСГ Б-В-Угерське -> Угерський поклад"},
      {object: 906023, name:"ПСГ Угерське"},
      {object: 906022, name:"ПСГ Дашавське"},
      {object: 906021, name:"ПСГ Опарське"},
      {object: 903031, name:"ПСГ Богородчанське"},
      {object: 901033, name:"ПСГ Олишівське"},
      {object: 901032, name:"ПСГ Мринське"},
      {object: 901031, name:"ПСГ Солохівське"},
      {object: 902031, name:"ПСГ Пролетарське"},
      {object: 902032, name:"ПСГ Кегичівське"},
      {object: 905031, name:"ПСГ Краснопопівське"},
      {object: 9, name:"ПСГ Вергунське"},    
    ]);
  }
}