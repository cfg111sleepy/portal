import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StatPacket, StatValue } from '../features/dashboards/gas-storage-map/gas-storage-map.models';

export const selectStatPacket = createFeatureSelector<StatPacket>('statistics');

export const selectStatDataMap = createSelector(
    selectStatPacket,
    (s1: StatPacket)=> {
        const map1 = new Map<string, StatValue>();
        s1.data.forEach(val => {
            map1.set(`${val._id.object}.${val._id.parameter}` , val);
        });
        return map1;
    }
    );