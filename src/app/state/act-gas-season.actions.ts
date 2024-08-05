import { createAction, props } from '@ngrx/store';
import { ActGasSeason, PsgNsi } from '../models/season-act-gas';

 
export const getAllPsgNsi = createAction(
  '[ActGasSeason] Get all psg NSI',
  //props<{ data: Psg[] }>()
);

export const getAllPsgNsiOk = createAction(
    '[ActGasSeason] Get all psg NSI Ok',
    props<{ data: PsgNsi[] }>()
  );

export const getAllPsgNsiError = createAction(
'[ActGasSeason] Get all psg NSI Err',
props<{ error: Error }>()
);

export const getSeasonsForPsg = createAction(
    '[ActGasSeason] Get seasons for psg',
    props<{ object: number }>()
);

export const getSeasonsForPsgOk = createAction(
    '[ActGasSeason] Get seasons for psg Ok',
     props<{ data: ActGasSeason[] }>()
);

export const getSeasonsForPsgErr = createAction(
    '[ActGasSeason] Get seasons for psg Err',
     props<{ error: Error }>()
);