import { createAction, props } from '@ngrx/store';
import { OpDataPacket } from '../features/dashboards/gas-storage-map/gas-storage-map.models';
import { HttpErrorResponse } from '@angular/common/http';
import { ForecastRow } from '../models/http';


  export const loadFlowForecastTable = createAction(
    '[HttpComms] Load flow forecast table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );

  export const loadFlowForecastSuccess = createAction(
    '[HttpComms] Load flow forecast Sucess',
      props<{ payload:OpDataPacket }>()
  );
  
  export const loadHttpError = createAction(
    '[HttpComms] Load Error',
    props<{ error: HttpErrorResponse }>()
  );

  export const loadConsumeTemperatureTable = createAction(
    '[HttpComms] Load loadConsumeTemperatureTable table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );

  export const loadConsumeTemperatureTableSuccess = createAction(
    '[HttpComms] Load loadConsumeTemperatureTable Sucess',
      props<{ payload:OpDataPacket }>()
  );

  export const loadConsumeRegionsTable = createAction(
    '[HttpComms] Load loadConsumeRegionsTable table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );

  export const loadConsumeRegionsTableSuccess = createAction(
    '[HttpComms] Load loadConsumeRegionsTable Sucess',
      props<{ payload:OpDataPacket }>()
  );

  export const loadDiffTable = createAction(
    '[HttpComms] Load loadDiffTable table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );

  export const loadDiffTableSuccess = createAction(
    '[HttpComms] Load loadDiffTable Sucess',
      props<{ payload:OpDataPacket }>()
  );

  export const SetFloForecastTotalsRow = createAction(
    '[HttpComms] SetFloForecastTotalsRow',
      props<{ payload: ForecastRow }>()
  );

  export const loadTable1 = createAction(
    '[HttpComms] Load table',
    props<{ objects:number[], parameters:number[], from:string, to:string }>()
  );

  export const loadTable1Success = createAction(
    '[HttpComms] Load table Sucess',
      props<{ payload:OpDataPacket }>()
  );