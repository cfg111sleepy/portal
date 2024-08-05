import { createAction, props } from '@ngrx/store';
import { Psg, SeasonInject} from '../features/statistics/season.models';

 

export const getSeasonsForYear = createAction(
    '[Season Inj] Get seasons for year',
    props<{ year: number }>()
);

export const getSeasonsForPsgOk = createAction(
    '[Season Inj] Get seasons for year Ok',
     props<{ data: SeasonInject[] }>()
);

export const getSeasonsForPsgErr = createAction(
    '[Season Inj] Get seasons for year Err',
     props<{ error: Error }>()
);
  

