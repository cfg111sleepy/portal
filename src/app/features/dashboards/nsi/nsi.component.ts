import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nsi',
  templateUrl: './nsi.component.html',
  styleUrls: ['./nsi.component.scss']
})
export class NsiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToLink(url: string){
    window.open("http://10.3.2.36:4200/docums/" + url, "_blank");
  }

}
