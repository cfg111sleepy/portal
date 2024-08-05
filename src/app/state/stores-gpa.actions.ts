import { createAction, props } from '@ngrx/store';
import { GasStore } from '../models/gas-stores';
import { Aggregate } from '../models/aggregates';

export const getAllPsg = createAction(
  '[StoresGpa] Get all psg',
  props<{ iso_ts: string }>()
);

export const getAllPsgOk = createAction(
    '[StoresGpa] Get all psg Ok',
    props<{ data: GasStore[] }>()
  );

export const getAllPsgError = createAction(
    '[StoresGpa] Get all psg Err',
    props<{ error: Error }>()
);

export const getAllGpa = createAction(
    '[StoresGpa] Get all gpa',
    props<{ iso_ts: string }>()
  );
  
  export const getAllGpaOk = createAction(
      '[StoresGpa] Get all gpa Ok',
      props<{ data: Aggregate[] }>()
    );
  
  export const getAllGpaError = createAction(
      '[StoresGpa] Get all gpa Err',
      props<{ error: Error }>()
  );
  