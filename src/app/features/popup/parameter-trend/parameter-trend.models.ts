export interface OpDataPacket {
    data: OpDataValues[];
}

export interface OpDataValues {
    _id:    ID;
    values: Value[];
}

export interface ID {
    object:    number;
    parameter: number;
}

export interface Value {
    time_stamp: Date;
    state:      string;
    value:      number;
    user:       number;
}