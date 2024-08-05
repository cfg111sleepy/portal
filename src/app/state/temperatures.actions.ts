import { createAction, props } from '@ngrx/store';
import { City, TemperaturePacket } from '../features/dashboards/temperature-map/temperature-map.models';

export const selectCity = createAction(
  '[WeatherForecast] Select City',
  props<{ id: string }>()
);

export const loadApidata = createAction(
  '[WeatherForecast] Load',
  //props<{ url:string }>()
);

export const loadCitiesNsi = createAction(
  '[WeatherForecast] Load cities NSI',
  //props<{ url:string }>()
);
export const loadCitiesNsiOk = createAction(
  '[WeatherForecast] Load cities NSI Ok',
  props<{ data: City[] }>()
);
export const loadCitiesNsiError = createAction(
  '[WeatherForecast] Load cities NSI error',
  props<{ error: Error }>()
);

export const loadApiSuccess = createAction(
  '[WeatherForecast] Load Sucess',
    props<{ payload:TemperaturePacket }>()
);

export const loadApiError = createAction(
  '[WeatherForecast] Load Error',
props<{ code: number }>()
);