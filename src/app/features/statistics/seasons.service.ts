import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Psg, Season, SeasonStats, SeasonInject } from './season.models';
import { SeasonPsgStatData } from 'src/app/models/season-act-gas';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  constructor(private http: HttpClient) { }
  
  getSeasonStatistics(id: string) : Observable<SeasonStats> {
    return this.http.get<SeasonStats>(environment.apiBaseUrl + `/seasons/${id}/stat`, { withCredentials: true });
  }

  getSeasonsForPsg(object: number) : Observable<Season[]> {
    return this.http.get<Season[]>(environment.apiBaseUrl + `/seasons?object=${object}`, { withCredentials: true });
  }

  getSeasonsInjectForYear(year: number) : Observable<SeasonInject[]> {
    return this.http.get<SeasonInject[]>(environment.apiBaseUrl + `/seasons-inject?year=${year}`, { withCredentials: true });
  }

  getSeasonStat(id: string) : Observable<SeasonStats> {
    return this.http.get<SeasonStats>(environment.apiBaseUrl + `/seasons/${id}/stat`, { withCredentials: true });
  }

  getAllPsgNSI() : Observable<Psg[]> {
    return of([
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

  getSeasonArray(value: string, from:string, to:string) : Observable<SeasonPsgStatData[]> {
    return this.http.get<SeasonPsgStatData[]>(environment.apiBaseUrl + `/seasons?value=${value}&start[$gte]=${from}&start[$lte]=${to}`, { withCredentials: true });
  }
}
