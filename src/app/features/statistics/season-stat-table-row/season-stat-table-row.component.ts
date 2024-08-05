import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MonthStat, Season, Stats } from '../season.models';

@Component({
  selector: '[app-season-stat-table-row]',
  templateUrl: './season-stat-table-row.component.html',
  styleUrls: ['./season-stat-table-row.component.scss']
})
export class SeasonStatTableComponentRow implements OnInit, OnChanges {
 @Input() dataYM?: MonthStat[] = [];
 @Input() data?: Stats[] = [];
 @Input() key: string = "sum";
 @Input() fixed = 3;
 @Input() name = "Parameter name";
 @Input() season?: Season;
 
 cells : string[] = [];
 cell : string = "";
 disp_months: number[] = [];
 
  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] ) {
      if (this.data) {        
        if (this.data[0]) {
          let temp = this.getValueByKey(this.data[0], this.key);  
          this.cell = temp.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});             
        } else {
          this.cell = "";
        } 
      }
    }
    if (changes["dataYM"] || changes["season"]) {
      this.cells = [];
      this.renderHeader();
      if (this.dataYM) {
        for (let i = 0; i < this.disp_months.length; i++) {
          let idx = this.disp_months[i]
          const val = this.dataYM.find(d=> d._id.month == idx+1);
          if (val) {
            let temp = this.getValueByKey(val, this.key);  
            this.cells[i] = temp.toLocaleString("fr-CA", {minimumFractionDigits: this.fixed});             
          } else {
            this.cells[i] = "";
          }         
        }
      }
    }

  }

  renderHeader() {
    if (this.season) {
      this.disp_months = [];
      let startM = new Date(this.season.start);
      let endM = this.season.end ? new Date(this.season.end) : new Date();      
      let length = this.monthDiff(startM, endM) + 1;
      let count = 0;      
      let i = startM.getMonth();
      while (count < length) {
        this.disp_months.push(i);
        i = (i+1) % 12;
        count++;
      }
    }
  }

  getValueByKey(Obj : any, key:string) : any {
    const keyTyped = key as keyof typeof Obj;
    return Obj[keyTyped];
  }

  monthDiff(d1: Date, d2: Date): number {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

}
