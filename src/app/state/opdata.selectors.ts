import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OpDataPacket, Value } from '../features/dashboards/gas-storage-map/gas-storage-map.models';

export const selectOpdata = createFeatureSelector<OpDataPacket>('opdata');

export const selectOpdataMap = createSelector(
    selectOpdata,
    (s1:OpDataPacket)=> {
        const map1 = new Map<string, Value[]>();
        s1.data.forEach(val => {
            map1.set(`${val._id.object}.${val._id.parameter}` , val.values);
        });
        return map1;
    }
    );