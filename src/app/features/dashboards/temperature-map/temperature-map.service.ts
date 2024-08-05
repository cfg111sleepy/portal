import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, TemperaturePacket } from './temperature-map.models';



 
@Injectable({ providedIn: 'root' })
export class TemperatureMapService {
  constructor(private http: HttpClient) {}
 
  get(tsIso: string): Observable<TemperaturePacket> {
    return this.http.get<TemperaturePacket>(environment.apiBaseUrl + `/temperatures?gasday=${tsIso}`, { withCredentials: true });
  }

  getAllCities(): Observable<City[]> {
    return of([
      {name: "Вінницька", location_id: 1},
      {name: "Волинська", location_id: 	2},
      {name: "Дніпропетровська", location_id: 	3},
      {name: "Донецька", location_id: 	4},
      {name: "Житомирська", location_id: 	5},
      {name: "Закарпатська", location_id: 	6},
      {name: "Запорізька", location_id: 	7},
      {name: "Івано-Франківська", location_id: 	8},
      {name: "Київська", location_id: 	9},
      {name: "Кіровоградська", location_id: 	10},
      {name: "Луганська", location_id: 	11},
      {name: "Львівська", location_id: 	12},
      {name: "Миколаївська", location_id: 	13},
      {name: "Одеська", location_id: 	14},
      {name: "Полтавська", location_id: 	15},
      {name: "Рівненська", location_id: 	16},
      {name: "Сумська", location_id: 	17},
      {name: "Тернопільська", location_id: 	18},
      {name: "Харківська", location_id: 	19},
      {name: "Херсонська", location_id: 	20},
      {name: "Хмельницька", location_id: 	21},
      {name: "Черкаська", location_id: 	22},
      {name: "Чернівецька", location_id: 	23},
      {name: "Чернігівська", location_id: 	24},
      {name: "Україна, загалом", location_id: 	25},
      {name: "Північний регіон", location_id: 	26},
      {name: "Західний регіон", location_id: 	27},
      {name: "Центральний регіон", location_id: 	28},
      {name: "Східний регіон", location_id: 	29},
      ])
  }

}