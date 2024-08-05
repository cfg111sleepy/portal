import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Value } from 'src/app/features/dashboards/gas-storage-map/gas-storage-map.models';

const datepipe: DatePipe = new DatePipe('en-US')

@Component({
  selector: 'app-with-inject-indicator',
  templateUrl: './with-inject-indicator.component.html',
  styleUrls: ['./with-inject-indicator.component.scss']
})
export class WithInjectIndicatorComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();

  value = "--";
  style = "neutral-label";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let values = this.data.get(`${this.key}`)

      if (values && values.length > 0) {
        values = values.filter(v=>v.value !== undefined)
      }

      if (values && values.length > 0) {

        let curr = values[values.length-1];
         
        if(curr && curr.value !== undefined) {
          let result = Number(curr.value);

          switch (result) {
            case 0:
              this.value = "--";
              this.style = "neutral-label";              
              break;
            case 1:
              this.value = "З";
              this.style = "zakachka-label";                          
              break;       
            case 2:
              this.value = "В";
              this.style = "otbor-label";              
              break;        
            case 3:
              this.value = "Н";
              this.style = "neutral-label";                          
              break;
            case 4:
              this.value = "П";
              this.style = "pereryv-label";                                      
              break;         
          
            default:
              break;
          }  

        } else {
          this.value = "--"; 
        }
     
      }
      else {
        this.value = "--"; 
      }
    }
  }


  
}
