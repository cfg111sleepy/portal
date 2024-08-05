import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RowValue, TemperaturePacket, TemperatureState, Value } from '../features/dashboards/temperature-map/temperature-map.models';

export const selectWheather = createFeatureSelector<TemperatureState>('wheater');

export const selectWheatherMap = createSelector(
    selectWheather,
    (s1: TemperatureState)=> {
        const map1 = new Map<string, Value[]>();
        s1.data.forEach(val => {
            map1.set(`${val._id}` , val.values);
        });
        return map1;
    }
);

export const selectedCity = createSelector(
    selectWheather,
    (s1: TemperatureState)=> {
        return s1.cities.find(c=> c.location_id.toString() == s1.selectedCity);
    }
);

export const selectWheatherMapCity = createSelector(
    selectWheather,
    selectWheatherMap,
    (s1: TemperatureState, s2: Map<string, Value[]>)=> {
        return s2.get(s1.selectedCity) || [];
    }
);

export const selectWheatherMapCityRows = createSelector(
    selectWheatherMapCity,
    (s1:  Value[])=> {
        let res: RowValue[] = [];
    
        let newMap : Map<string, Value[]> = new Map<string, Value[]>();
        
        s1.forEach(val => {
          let ts = new Date(val.time_stamp).toISOString();      
          if (!newMap.has(ts)) newMap.set(ts, []);
          newMap.get(ts)?.push(val);
        });
    
        newMap.forEach( (val, key) => {
            //weekDayDecode
          let d = new Date(key);  
          let day = weekDayDecode(d.getDay());
          let row: RowValue = {
            time_stamp : day + ", " + d.toLocaleDateString(),
            Tmin: "",
            Tmax: "",
            Tavg: "",
            weekDay:""
          }
    
          let min = val.find(v=> v.parameter == 1);
          let max = val.find(v=> v.parameter == 2);
          let avg = val.find(v=> v.parameter == 3);
    
          row.Tmin = min? min.value.toFixed(1) : "---";
          row.Tmax = max? max.value.toFixed(1) : "---";
          row.Tavg = avg? avg.value.toFixed(1) : "---";
    
          res.push(row);
        });
       return res;
    }
);

function weekDayDecode(day: number) {
    switch (day) {
        case 0:
          return "Нд";
        case 1:
          return "Пн";
        case 2:
          return "Вт";
        case 3:
          return "Ср";
        case 4:
          return "Чт";
        case 5:
          return "Пт";
        case 6:
          return "Сб";
                                              
      default:
        return "?";
    }
  }