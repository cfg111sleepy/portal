import { createAction, props } from '@ngrx/store';
import { OpDataPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import { HttpErrorResponse } from '@angular/common/http';
 
export const loadOpdata = createAction(
  '[Opdata] Load',
  props<{ url:string }>()
);

export const loadOpdataRange = createAction(
  '[Opdata] Load range',
  props<{ url:string }>()
);

export const loadOpdataRangeWithFromTo = createAction(
  '[Opdata] Load range WithFromTo',
  props<{ url:string, from:string, to:string }>()
);

export const loadTable = createAction(
  '[Opdata] Load table',
  props<{ objects:number[], parameters:number[], from:string, to:string }>()
);

export const xlsExportRange = createAction(
  '[Opdata] Xls export range',
  props<{ objects:number[], parameters:number[], fileName:string, from:string, to:string }>()
);

export const loadOpSuccess = createAction(
  '[Opdata] Load Sucess',
    props<{ payload:OpDataPacket }>()
);

export const loadOpdataError = createAction(
  '[Opdata] Load Error',
  props<{ error: HttpErrorResponse }>()
);