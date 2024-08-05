import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GasStore } from 'src/app/models/gas-stores';

@Component({
  selector: 'app-psg-park-gpa',
  templateUrl: './psg-park-gpa.component.html',
  styleUrls: ['./psg-park-gpa.component.scss']
})
export class PsgParkGpaComponent implements OnInit, OnChanges {
  constructor() { }

  @Input() data:  GasStore[] = [];
  @Input() key = 0;
  
  park: string = "-";
  work: string = "-";
  res: string = "-";
  rep: string = "-";

  active: string = "row header nowork";

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let store = this.data.find(s=> s.object == this.key);
      if (store) {
        this.park = store.total_gpa.toFixed(0);
        this.work = store.work_gpa.toFixed(0);
        this.rep = store.repair_gpa.toFixed(0);
        this.res = store.reserv_gpa.toFixed(0);
        this.active = store.work_gpa > 0 ? "row header work" : "row header nowork";
      } else {
        this.park = "-";
        this.work = "-";
        this.rep = "-";
        this.res = "-";
        this.active = "row header nowork";
      }
    }
  }

}
