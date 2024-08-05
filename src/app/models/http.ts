import { OpDataPacket } from "../features/dashboards/gas-storage-map/gas-storage-map.models";

export interface HttpCommsState {
    flow_forecast?: OpDataPacket;
    consume_temperature?: OpDataPacket;
    consume_regiions?: OpDataPacket;
    consume_diffs?: OpDataPacket;
    totals1?: ForecastRow;
    error?: Error;
    table1?: OpDataPacket;
}

export interface ForecastRow {
    hour:string;
    d_4: number;
    d_3: number;
    d_2: number;
    d_1: number;
    d: number;
  
    d_4s: string;
    d_3s: string;
    d_2s: string;
    d_1s: string;
    ds:   string;
    
    k:   number;
    ks:  string;
    f:   number;
    d_f: string;
    time_stamp: Date;
  }

  export  interface ConsumeTemperatureRow {
    color?:string;
    date?:string;
    time:  number;
    tov_q?:  number;
    delta_q?:number;
    total_q?:number;
    t_max?:  number;
    t_min?:  number;
    t_avg?:  number;
  
    tov_qs?:  string;
    delta_qs?:string;
    total_qs?:string;
    t_maxs?:  string;
    t_mins?:  string;
    t_avgs?:  string;
  }

  export interface RegionsConsumeRow {
    name?: string;
    d_3:  number;
    d_2:  number;
    d_1:  number;  
    d_3s: string;
    d_2s: string;
    d_1s: string;
  }