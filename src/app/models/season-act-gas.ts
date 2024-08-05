export interface PsgNsi {
    object: number;
    name: string;
}

export interface ActGasSeasonsState {
    selectedPsg: number,
    psgNsi: PsgNsi[],
    seasons: ActGasSeason[],
    error?: Error    
}

export interface ActGasSeasonPacket {
    data: ActGasSeason[];
}

export interface ActGasSeason {
    object: number;
    state: string;
    value: number;
    act_gas: number;
    start: Date;
    change: number;
}

export interface SeasonPsgStatData {
    object: number;
    state: string;
    value: number;
    start: Date;
    end: Date;
    name: string;
    start_fact: Date;
    end_fact: Date;
    neutral_start: Date;
    neutral_end: Date;
    ready_at: Date;
    act_gas_begin: number;
    act_gas_end: number;
    BTB: number;
    WI: number;
    total_days: number;
    work_days: number;
    order: number;
}

export interface SeasonSelector {
    key: string;
    option: string;
    value: string;
    start: string;
    end: string;
}