import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface NgbDatesRange {
    from : NgbDateStruct,
    to: NgbDateStruct
}

export interface NgbDatesRangeObjects {
    from : Date,
    to: Date
}

export interface NgbDatesRangeIso {
    from : string,
    to: string
}