export interface OpDataPacket {
    data: OpDataValues[];
}

export interface StatPacket {
    data: StatValue[];
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

export interface NSI {
    name: string;
    value: string;
    object: number;
    tab: number;
}
export interface NsiPacket {
    data: NSI[];
}

export interface StatValue {
    _id:   ID;
    count: number;
    begin: Date;
    first?: number;
    avg:   number;
    sum:   number;
    max:   number;
    min:   number;
    last?:  number;
    end:   Date;
}

