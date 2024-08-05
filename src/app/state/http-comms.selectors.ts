import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Value } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import { HttpCommsState } from '../models/http';

export const selectMainState = createFeatureSelector<HttpCommsState>('httpcomms');

    export const selectFlowForecastMap = createSelector(
        selectMainState,
        (s1: HttpCommsState)=> {
            const map1 = new Map<string, Value[]>();
            s1.flow_forecast?.data.forEach(val => {
                map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
            });
            return map1;
        }
    );

    export const selectConsumeTemperatureMap = createSelector(
        selectMainState,
        (s1: HttpCommsState)=> {
            const map1 = new Map<string, Value[]>();
            s1.consume_temperature?.data.forEach(val => {
                map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
            });
            return map1;
        }
    );

    export const selectConsumeRegionsMap = createSelector(
        selectMainState,
        (s1: HttpCommsState)=> {
            const map1 = new Map<string, Value[]>();
            s1.consume_regiions?.data.forEach(val => {
                map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
            });
            return map1;
        }
    );

    export const selectConsumeDiffsMap = createSelector(
        selectMainState,
        (s1: HttpCommsState)=> {
            const map1 = new Map<string, Value[]>();
            s1.consume_diffs?.data.forEach(val => {
                map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
            });
            return map1;
        }
    );

    export const selectConsumeForecastTotals = createSelector(
        selectMainState,
        (s1: HttpCommsState)=> {
            return s1.totals1;
        }
    );

    export const selectTable1 = createSelector(
        selectMainState,
        (s1:HttpCommsState)=> {
            const map1 = new Map<string, Value[]>();
            s1.table1?.data.forEach(val => {
                map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
            });
            return map1;
        }
    );