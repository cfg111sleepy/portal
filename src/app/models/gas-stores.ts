import { Aggregate } from "./aggregates";

export interface AllGpaGasStoreState {
    stores:  GasStore[];
    aggregs: Aggregate[];
    error?: Error    
}

export interface GasStoreResp {
    skip:  number;
    limit: string;
    total: number;
    data:  GasStore[];
}

export interface GasStore {
    ks:         KC[];
    object:     number;
    time_stamp: Date;
    name:       string;
    total_gpa:  number;
    work_gpa:   number;
    repair_gpa: number;
    reserv_gpa: number;
    state:      string;
    state_ts:   Date;    
    value:      number;    
}

export interface KC {
    ceh:        number;
    total_gpa:  number;
    work_gpa:   number;
    reserv_gpa: number;
    repair_gpa: number;
}

