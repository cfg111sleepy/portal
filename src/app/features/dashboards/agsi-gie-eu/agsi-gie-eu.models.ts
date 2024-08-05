export interface AgsiState {
    day?:  AgsiApiResp,
    dayLastY?:  AgsiApiResp,
    hist?: AgsiApiResp,
    error?: Error 
}

export interface AgsiApiResp {
    last_page: number;
    total:     number;
    dataset:   string;
    gas_day:   Date;
    data:      AgsiDayData[];
}

export interface AgsiDayData {
    name:               string;
    code:               string;
    url:                string;
    gasDayStart:        Date;
    gasInStorage:       string;
    consumption:        string;
    consumptionFull:    string;
    injection:          string;
    withdrawal:         string;
    netWithdrawal:      string;
    workingGasVolume:   string;
    injectionCapacity:  string;
    withdrawalCapacity: string;
    coveredCapacity?:   string;
    status:             string;
    trend:              string;
    full:               string;
    info:               any[];
    children?:           AgsiDayData[];
}

export interface AgsiDayNumValues {
    gasDayStart:        string;
    gasInStorage:       string;
    injection:          string;
    withdrawal:         string;
    workingGasVolume:   string;
    injectionWithdraw:  string;
    trend:              string;
    style:              string;
    full:               string;
    wo_style:           string;
}
