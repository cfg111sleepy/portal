export interface TemperatureState {
    data: RegionData[];
    selectedCity: string;
    cities: City[];
}

export interface TemperaturePacket {
    data: RegionData[];
}

export interface RegionData {
    _id:    number;
    values: Value[];
}

export interface Value {
    time_stamp: Date;
    state:      string;
    value:      number;
    user:       number;
    parameter:  number;
}

export interface RowValue {
    weekDay: string;
    time_stamp: string;
    Tmin: string;
    Tmax: string;
    Tavg: string;
}

export interface City {
    location_id: number;
    name: string;
}