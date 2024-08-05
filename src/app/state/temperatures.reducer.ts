import { createReducer, on } from '@ngrx/store';
import { TemperaturePacket, TemperatureState } from '../features/dashboards/temperature-map/temperature-map.models';
import * as actions from './temperatures.actions'

export const initialState: TemperatureState = {
    data:[],
    selectedCity: "25",
    cities: []
};
 
export const wheaterForecastReducer = createReducer(
  initialState,
  on(actions.selectCity, (state, { id }) => { 
    return {
      ...state, 
      selectedCity: id, 
    }} ),
  on(actions.loadApiSuccess, (state, { payload }) => { 
    return {
      ...state, 
      data: payload.data, 
    }} ),
  on(actions.loadApiError, (state, { code }) => { 
    return {
      ...state, 
      data: [], 
    }} ),
  on(actions.loadCitiesNsiOk, (state, { data }) => { 
      return {
        ...state, 
        cities: data, 
    }} ),
  

);