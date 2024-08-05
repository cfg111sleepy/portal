import { Component,  EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

@Component({
  selector: '[app-psg-base-seacon]',
  templateUrl: './psg-base-seacon.component.svg',
  styleUrls: ['./psg-base-seacon.component.scss']
})
export class PsgBaseSeaconComponent implements OnInit, OnDestroy {

  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 120;
  @Input() h = 30;
  @Input() min = 0;
  @Input() max = 100;

  @Input() fillColor = 'rgb(199, 209, 216)';
  @Input() progressColor = 'rgb(244,106,76)';

  seconds = interval(1000);
  value: number = 0;
  season: string = "";
  baseInject = new Date();
  baseWith = new Date();

  constructor( private calendar: NgbCalendar) { }

  sub1 = this.seconds.subscribe(val => {
    let resInj = this.calculateDiff(this.baseInject);
    let resWit = this.calculateDiff(this.baseWith);

    this.value = resInj < resWit ? Math.abs(resInj) : Math.abs(resWit);
    this.season = resInj < resWit ? 'закачки' : 'відбору';
  });

  ngOnInit(): void {
    this.baseInject.setMonth(9, 15); // начало отбора конец закачки 15-10
    this.baseInject.setHours(7,0,0,0);
    this.baseWith.setMonth(3, 1);   // начало закачки конец отбора 01-04
    this.baseWith.setHours(7,0,0,0);
  }

  calculateDiff(dateSent: Date){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor(( Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
