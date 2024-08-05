import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatesRange } from '../range.models';

@Component({
  selector: 'app-popup-range-selector',
  templateUrl: './popup-range-selector.component.html',
  styleUrls: ['./popup-range-selector.component.scss']
})
export class PopupRangeSelectorComponent implements OnInit, OnChanges {
  //start range
  @Input() start: NgbDatesRange = {
    from: new NgbDate(2022,1,1),
    to: new NgbDate(2022,1,1)
  }

  from: NgbDateStruct =  new NgbDate(2022,1,1);
  to: NgbDateStruct = new NgbDate(2022,1,1);
  
  @Output() changed: EventEmitter<NgbDatesRange> = new EventEmitter<NgbDatesRange>();

  constructor() { }

  ngOnInit(): void {
    this.from = this.start.from;
    this.to = this.start.to;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  rangeChanged(date: NgbDate): void {
   // console.log(date)
    this.changed.emit(
      {
        from: this.from,
        to: this.to
      }
    )
	}
  
}
