import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as opActions from '../../../../state/opdata.actions';
import * as opSelector from '../../../../state/opdata.selectors';
import { Value } from '../../gas-storage-map/gas-storage-map.models';
import { navigateTo } from '../../../../state/navigation.actions';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-zamovnyk-table',
  templateUrl: './zamovnyk-table.component.html',
  styleUrls: ['./zamovnyk-table.component.scss']
})
export class ZamovnykTableComponent implements OnInit, OnDestroy {

  constructor(private store: Store,) { }

  to = new Date();
  from = new Date();
  dataMap : Map<string, Value[]> =  new Map<string, Value[]>();
  dataMap$ = this.store.select(opSelector.selectOpdataMap);

  rows: string[][] = [];

  ngOnInit(): void {
    this.to.setHours(7, 0,0,0);
    this.from = new Date(this.to);
    this.from.setDate(this.from.getDate() - 30);

    this.store.dispatch(opActions.loadTable({objects: [
      611103,611105,611122,611132,611133,611123,611125,611124,611126,611127,611134,611135,611128,611130,611129,611131,
      45,46,47,48,49,50,51,52
    ], parameters:[63], from: this.from.toISOString(), to: this.to.toISOString()}));
    
    let timeIndex = this.from;

    while (timeIndex.getTime() < this.to.getTime()) {
      let tmp = [];
      tmp[0] = new Date(timeIndex).toLocaleDateString();
      tmp[1]= timeIndex.getTime().toString();
      this.rows.push(tmp);
      timeIndex.setDate(timeIndex.getDate() + 1);

      this.rows.sort((a,b)=>{
        return Number(b[1]) - Number(a[1]);
      });

    }
    
  }

  sub1 = this.dataMap$.subscribe(map=> {
    this.dataMap = map;
    let colB = this.dataMap.get("611103.63");
    let colC = this.dataMap.get("611105.63");
    let colD = this.dataMap.get("611122.63");
    let colE = this.dataMap.get("45.63");
    let colF = this.dataMap.get("611132.63");
    let colG = this.dataMap.get("46.63"); 
    let colH = this.dataMap.get("611133.63"); 
    let colI = this.dataMap.get("611123.63"); 
    let colJ = this.dataMap.get("47.63");
    let colK = this.dataMap.get("611125.63"); 
    let colL = this.dataMap.get("611124.63"); 
    let colM = this.dataMap.get("48.63");
    let colN = this.dataMap.get("611126.63"); 
    let colO = this.dataMap.get("611127.63"); 
    let colP = this.dataMap.get("49.63");
    let colQ = this.dataMap.get("611134.63"); 
    let colR = this.dataMap.get("50.63"); 
    let colS = this.dataMap.get("611135.63"); 
    let colT = this.dataMap.get("611128.63");
    let colU = this.dataMap.get("51.63");
    let colV = this.dataMap.get("611130.63");
    let colW = this.dataMap.get("611129.63");
    let colX = this.dataMap.get("52.63");
    let colY = this.dataMap.get("611131.63");

    this.rows.forEach(row => {
      this.setCellValue(colB, row, 2);  
      this.setCellValue(colC, row, 3);
      this.setCellValue(colD, row, 4);
      this.setCellValue(colE, row, 5);
      this.setCellValue(colF, row, 6);
      this.setCellValue(colG, row, 7);
      this.setCellValue(colH, row, 8);
      this.setCellValue(colI, row, 9);
      this.setCellValue(colJ, row, 10);
      this.setCellValue(colK, row, 11);
      this.setCellValue(colL, row, 12);
      this.setCellValue(colM, row, 13);
      this.setCellValue(colN, row, 14);
      this.setCellValue(colO, row, 15);
      this.setCellValue(colP, row, 16);
      this.setCellValue(colQ, row, 17);
      this.setCellValue(colR, row, 18);
      this.setCellValue(colS, row, 19);
      this.setCellValue(colT, row, 20);
      this.setCellValue(colU, row, 21); 
      this.setCellValue(colV, row, 22); 
      this.setCellValue(colW, row, 23); 
      this.setCellValue(colX, row, 24); 
      this.setCellValue(colY, row, 25); 
    });


  });

  setCellValue(data: Value[] | undefined, row: string[], i: number) {
    let val = data?.find(v=> new Date(v.time_stamp).getTime() == Number(row[1]));
    row[i] = val && val.value !== undefined ? val.value.toString() : ""; 
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    //this.sub2.unsubscribe();
  }

  onNavigate(url:string, params: NavigationExtras) {
    this.store.dispatch(navigateTo({ url, params }));
  }
}
