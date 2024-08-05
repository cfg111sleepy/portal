export interface AggregateResp {
    skip:  number;
    limit: string;
    total: number;
    data:  Aggregate[];
}

export interface Aggregate {
    object:     number;
    time_stamp: Date;
    ceh:        number;
    cent_cp_d:  number;
    cent_cp_n?: number;
    cent_kp_d:  number;
    cent_kp_n?: number;
    cent_to_d:  number;
    cent_to_n?: number;
    compr_id:   number | null;
    drive_id:   number;
    res_kp_d:   number;
    res_kp_n?:  number;
    res_to_d:   number;
    res_to_n?:  number;
    rest_kp_d?: number;
    rest_kp_n?: number;
    rest_to_d?: number;
    rest_to_n?: number;
    state:      string;
    state_ts:   Date;
    updated_at: Date;
    value:      number;
    name:       string;
    res_cp_d?:  number;
    res_cp_n?:  number;
    rest_cp_n?: number;
    rest_cp_d?: number;
    drive_name: string;
    compr_name: string;
}

