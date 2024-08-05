import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Season } from '../season.models';

@Component({
  selector: '[app-season-stat-table-header]',
  templateUrl: './season-stat-table-header.component.html',
  styleUrls: ['./season-stat-table-header.component.scss']
})
export class SeasonStatTableHeaderComponent implements OnInit, OnChanges {
  @Input() season?: Season; 

  full_months: string[] = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
  disp_months: string[] = ["Параметр"];

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes["season"] && this.season) {
      this.disp_months = ["Параметр"];
      let startM = new Date(this.season.start);
      let endM = this.season.end ? new Date(this.season.end) : new Date();
      
      let length = this.monthDiff(startM, endM) + 1;

      let count =0;      
      let i = startM.getMonth();

      while (count < length) {
        this.disp_months.push(this.full_months[i]);
        i = (i+1) % 12;
        count++;
      }
      this.disp_months.push("Сезон загалом");
    }
  }

  monthDiff(d1: Date, d2: Date): number {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
}
