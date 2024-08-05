import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../../../state/range.selectors';
import * as ra from '../../../state/range.actions';
import * as actions from '../../../state/opdata.actions';
import { NgbDatesRange } from '../../range/range.models';
import * as opDataSelectors from '../../../state/opdata.selectors'
import { Value } from '../gas-storage-map/gas-storage-map.models';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as rangeActions from '../../../state/range.actions';

interface DaysCompare {
  diff?:  number;
  last?: Value;
  prev?: Value;
  object: number;
  parameter: number;
}

@Component({
  selector: 'app-tov-regim-charts',
  templateUrl: './tov-regim-charts.component.html',
  styleUrls: ['./tov-regim-charts.component.scss']
})
export class TovRegimChartsComponent implements OnInit, OnDestroy {

  dataMap$ = this.store.select(opDataSelectors.selectOpdataMap);
  range$ = this.store.select(selectors.selectDatesRange);
  selectedTrend: string = "";
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();

  daysCompareH8: DaysCompare[] = [];

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
    this.daysCompareH8 = this.createBorderPoints(map);
    //console.log(this.daysCompareH8)
  });

  constructor(private store: Store, private modalService: NgbModal, private calendar: NgbCalendar) { 
    
  }

  ngOnInit(): void {
    let date = this.calendar.getToday();
    let rangeStart = this.calendar.getPrev(date, "d", 1);
    let rangeEnd = this.calendar.getNext(date, "d", 1);
    let range = {
      from: rangeStart,
      to: rangeEnd
    };
    this.store.dispatch(rangeActions.newDatesRange({ range}));

    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/2"}));
  }

  onRangeChanged(event : NgbDatesRange): void {
    //console.log(event)
    this.store.dispatch(ra.newDatesRange({range: event}));
    this.store.dispatch(actions.loadOpdataRange({url:"/dataset/2"}));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  getDaysCompareRow(object: number): DaysCompare {
    let res = this.daysCompareH8.find(e=>e.object == object);
    if (res) {
      return res;
    } else {
      return {
        object: object,
        parameter:9
      };
    }
    
  }

  //PSG border points compare
  createBorderPoints(map : Map<string, Value[]>) {
    let res = [];
    let ids = [6102135,999601,999606,6090439,6080470,6080471,6080472,6080473,6080474,2110676,2110675,3012226,1091110,1091136];
    for (let i = 0; i < ids.length; i++) {
      const obj = ids[i];
      let v = map.get(obj+".9");
      let v8 = v?.filter(v=> new Date(v.time_stamp).getHours() == 8);
      if (v8 && v8.length > 1) {
        let n = {
          object:obj,
          parameter: 9,
          prev: v8[v8.length-2],
          last: v8[v8.length-1],
          diff: v8[v8.length-1].value - v8[v8.length-2].value
        }
        res.push(n);
      } 
    }
    return res;
  }

  openScrollableContent(longContent: any, key : string) {
    this.selectedTrend = key;
    this.modalService.open(longContent, { scrollable: true });
	}

}
