import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Value } from '../../dashboards/temperature-map/temperature-map.models';

@Component({
  selector: '[app-weather-city]',
  templateUrl: './weather-city.component.svg',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit, OnChanges {
  @Input() key = "";
  @Input() data : Map<string, Value[]> =  new Map<string, Value[]>();
    
  @Input() x = 100;
  @Input() y = 100;
  @Input() w = 90;
  @Input() h = 30;  
  @Input() fillColor = 'rgb(255, 255, 255)';
  @Input() dt = '';
  @Output() click = new EventEmitter<string>();
  
  value = "---";
  delta = "---";
  fillDelta = "green";
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data ) {
      let v = this.data.get(`${this.key}`)
      if (!v) {
        this.value = "---";
        this.delta = "---"; 
        return;
      };
      
      let values = v.filter(v=> v.time_stamp.toString() == this.dt);
      if (values && values.length == 3) {
        values.sort((a,b)=> a.parameter - b.parameter);

        let min = values[0].value > 0 ? "+" + values[0].value.toFixed(0): values[0].value.toFixed(0); 
        let max = values[1].value > 0 ? "+" + values[1].value.toFixed(0): values[1].value.toFixed(0);
        let avg = values[2].value > 0 ? "+" + values[2].value.toFixed(0): values[2].value.toFixed(0);

        this.value = avg; 
        this.delta = `${min}...${max}`;       
      }
      else {
        this.value = "---";
        this.delta = "---";  
      }
    }
  }
    
  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit(this.key);
  }
}
