import { Component, OnInit, Input, OnChanges,  SimpleChanges  } from '@angular/core';
import { Aggregate } from 'src/app/models/aggregates';


@Component({
  selector: 'app-gpa-to-cp-kp',
  templateUrl: './gpa-to-cp-kp.component.html',
  styleUrls: ['./gpa-to-cp-kp.component.scss']
})
export class GpaToCpKpComponent implements OnInit {

  constructor() { }

  @Input() data:  Aggregate[] = [];
  @Input() key = 0;
  @Input() eng_comp: boolean = false; //engine or compressor switch

  name: string = "-";
  type: string = "-";

  cent_cp_d: string = "-";
  cent_kp_d: string = "-";
  cent_to_d: string = "-";
  
  res_kp_d: string = "-";
  res_to_d: string = "-";
  res_cp_d: string = "-";
  
  rest_kp_d: string = "-";
  rest_to_d: string = "-";
  rest_cp_d: string = "-";

  active: string = "container card nowork"

  progress_to: string = "progress-bar gre"
  progress_kp: string = "progress-bar gre"
  progress_cp: string = "progress-bar gre"

  show_cent_inside_to: boolean = false;
  show_cent_inside_kp: boolean = false;
  show_cent_inside_cp: boolean = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] && this.data || changes["eng_comp"]) {
      let gpa = this.data.find(s=> s.object == this.key);
      if (gpa) {
        this.name = gpa.name;
  
        if(this.eng_comp == false){
          this.cent_cp_d = `${gpa.cent_cp_d}%`;
          this.cent_kp_d = `${gpa.cent_kp_d}%`;
          this.cent_to_d = `${gpa.cent_to_d}%`;
          
          this.res_kp_d = gpa.res_kp_d.toFixed(0);
          this.res_to_d = gpa.res_to_d.toFixed(0);
          this.res_cp_d = gpa.res_cp_d ? gpa.res_cp_d?.toFixed(0) : "";
          
          this.rest_kp_d = gpa.rest_kp_d ? gpa.rest_kp_d?.toFixed(0) : "";
          this.rest_to_d = gpa.rest_to_d ? gpa.rest_to_d?.toFixed(0) : "";
          this.rest_cp_d = gpa.rest_cp_d ? gpa.rest_cp_d?.toFixed(0) : "";
  
          this.type =  gpa.drive_name; 

          if (gpa.cent_cp_d < 20) {
            this.progress_cp = "progress-bar red";
            this.show_cent_inside_cp = false;
          } else if (gpa.cent_cp_d > 50) {
            this.progress_cp = "progress-bar gre";
            this.show_cent_inside_cp = true;
          } else {
            this.progress_cp = "progress-bar yel";
            this.show_cent_inside_cp = true;
          }
  
          if (gpa.cent_kp_d < 20) {
            this.progress_kp = "progress-bar red";
            this.show_cent_inside_kp = false;
          } else if (gpa.cent_kp_d > 50) {
            this.progress_kp = "progress-bar gre";
            this.show_cent_inside_kp = true;
          } else {
            this.progress_kp = "progress-bar yel";
            this.show_cent_inside_kp = true;
          }
  
          if (gpa.cent_to_d < 20) {
            this.progress_to = "progress-bar red";
            this.show_cent_inside_to = false;
          } else if (gpa.cent_to_d > 50) {
            this.progress_to = "progress-bar gre";
            this.show_cent_inside_to = true;
          } else {
            this.progress_to = "progress-bar yel";
            this.show_cent_inside_to = true;
          }

        } else {
          this.cent_cp_d = `${gpa.cent_cp_n}%`;
          this.cent_kp_d = `${gpa.cent_kp_n}%`;
          this.cent_to_d = `${gpa.cent_to_n}%`;
          
          this.res_kp_d = gpa.res_kp_n ? gpa.res_kp_n.toFixed(0): "";
          this.res_to_d = gpa.res_to_n ? gpa.res_to_n.toFixed(0): "";
          this.res_cp_d = gpa.res_cp_n ? gpa.res_cp_n?.toFixed(0) : "";
          
          this.rest_kp_d = gpa.rest_kp_n ? gpa.rest_kp_n?.toFixed(0) : "";
          this.rest_to_d = gpa.rest_to_n ? gpa.rest_to_n?.toFixed(0) : "";
          this.rest_cp_d = gpa.rest_cp_n ? gpa.rest_cp_n?.toFixed(0) : "";
  
          this.type = gpa.compr_name; 

        if (gpa.cent_cp_n && gpa.cent_cp_n < 20) {
          this.progress_cp = "progress-bar red";
          this.show_cent_inside_cp = false;
        } else if (gpa.cent_cp_n && gpa.cent_cp_n > 50) {
          this.progress_cp = "progress-bar gre";
          this.show_cent_inside_cp = true;
        } else {
          this.progress_cp = "progress-bar yel";
          this.show_cent_inside_cp = true;
        }

        if (gpa.cent_kp_n && gpa.cent_kp_n < 20) {
          this.progress_kp = "progress-bar red";
          this.show_cent_inside_kp = false;
        } else if (gpa.cent_kp_n && gpa.cent_kp_n > 50) {
          this.progress_kp = "progress-bar gre";
          this.show_cent_inside_kp = true;
        } else {
          this.progress_kp = "progress-bar yel";
          this.show_cent_inside_kp = true;
        }

        if (gpa.cent_to_n && gpa.cent_to_n < 20) {
          this.progress_to = "progress-bar red";
          this.show_cent_inside_to = false;
        } else if (gpa.cent_to_d > 50) {
          this.progress_to = "progress-bar gre";
          this.show_cent_inside_to = true;
        } else {
          this.progress_to = "progress-bar yel";
          this.show_cent_inside_to = true;
        }
        }






        if (gpa.value == 1) {
          this.active = "container card work"  
        } else if (gpa.value == 3) {
          this.active = "container card to"
        } else {
          this.active = "container card nowork"  
        }

      } else {

        this.name = "-";
        this.type = "-";
  
        this.cent_cp_d = "-";
        this.cent_kp_d = "-";
        this.cent_to_d = "-";
        
        this.res_kp_d = "-";
        this.res_to_d = "-";
        this.res_cp_d = "-";
        
        this.rest_kp_d = "-";
        this.rest_to_d = "-";
        this.rest_cp_d = "-";
      
        this.active = "container card nowork"
      
      }
    }
  }

}
