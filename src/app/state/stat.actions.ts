import { createAction, props } from '@ngrx/store';
import { StatPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import { HttpErrorResponse } from '@angular/common/http';

  
  export const loadTable = createAction(
    '[StatData] Load table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );
  
  export const loadOpSuccess = createAction(
    '[StatData] Load Sucess',
      props<{ payload: StatPacket }>()
  );
  
  export const loadOpdataError = createAction(
    '[StatData] Load Error',
    props<{ error: HttpErrorResponse }>()
  );