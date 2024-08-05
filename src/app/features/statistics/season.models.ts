import { SeasonPsgStatData } from "src/app/models/season-act-gas";
import { Value } from "../dashboards/gas-storage-map/gas-storage-map.models";

export interface SeasonStats {
    t_r_H2O_ym:         MonthStat[];
    t_r_H2O:            Stats[];
    t_r_CH_ym:          MonthStat[];
    t_r_CH:             Stats[];
    wi_ym:              MonthStat[];
    wi:                 Stats[];
    in_ym:              MonthStat[];
    in:                 Stats[];
    vtv_in_ym:          MonthStat[];
    vtv_in:             Stats[];
    vtv_wi_ym:          MonthStat[];
    vtv_wi:             Stats[];
    pg_ym:              MonthStat[];
    pg:                 Stats[];
    wi_bad_ch_ym:       MonthStat[];
    wi_bad_ch:          Stats[];
    in_bad_ch_ym:       MonthStat[];
    in_bad_ch:          Stats[];
    wi_bad_h2o_ym:      MonthStat[];
    wi_bad_h2o:         Stats[];
    in_bad_h2o_ym:      MonthStat[];
    in_bad_h2o:         Stats[];
    wi_samoplyv_ym:     MonthStat[];
    wi_samoplyv:        Stats[];
    vtv_wi_samoplyv_ym: MonthStat[];
    vtv_wi_samoplyv:    Stats[];
    in_samoplyv_ym:     MonthStat[];
    in_samoplyv:        Stats[];
    vtv_in_samoplyv_ym: MonthStat[];
    vtv_in_samoplyv:    Stats[];
    wi_compress_ym:     MonthStat[];
    wi_compress:        Stats[];
    vtv_wi_compress_ym: MonthStat[];
    vtv_wi_compress:    Stats[];
    in_compress_ym:     MonthStat[];
    in_compress:        Stats[];
    vtv_in_compress_ym: MonthStat[];
    vtv_in_compress:    Stats[];
    p_ym: MonthStat[];
    p:    Stats[];
    tact_gas_begin: Value;
    tact_gas_end: Value;
    act_gas_begin: Value;
    act_gas_end: Value;
}

export interface MonthStat {
    _id:   OPYYYYMM;
    count: number;
    begin: Date;
    first: number;
    avg:   number;
    sum:   number;
    max:   number;
    min:   number;
    last:  number;
    end:   Date;
}

export interface Stats {
    _id:   OP;
    count: number;
    begin: Date;
    first: number;
    avg:   number;
    sum:   number;
    max:   number;
    min:   number;
    last:  number;
    end:   Date;
}

export interface OP {
    object:    number;
    parameter: number;
    season: string;
}

export interface OPYYYYMM {
    object:    number;
    parameter: number;
    year:      number;
    month:     number;
    season: string;
}

export interface Season {
    _id:            string;
    object:         number;
    start:          Date;
    value:          number;
    neutral_end?:   Date;
    state:          string;
    end?:           Date;
    neutral_start?: Date;
}

export interface Psg {
    object:         number;
    name:          string;
}

export interface SeasonsState {
    selectedPsg: number,
    selectedSeason: string,
    allPsgNsi: Psg[],
    seasons: Season[],
    seasons1: SeasonPsgStatData[],
    stats?: SeasonStats,
    error?: Error    
}

export interface SeasonsInjectState {
    selectedYear: number,
    seasons: SeasonInject[],
    error?: Error    
}

export interface SeasonInject {
    _id:                string;
    object:             number;
    value:              number;
    state:              string;
    year:               number;
    injected?:          number;
    vtv_np1?:           number;
    vtv_np2?:           number;
    vtv_inj?:           number;
    start?:             Date;
    end?:               Date;
    start_inject_fact?: Date;
    end_inject_fact?:   Date;
    np1_start?:         Date;
    np1_end?:           Date;
    np2_start?:         Date;
    np2_end?:           Date;
}