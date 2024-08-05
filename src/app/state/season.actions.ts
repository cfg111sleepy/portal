import { createAction, props } from '@ngrx/store';
import { Psg, Season, SeasonStats } from '../features/statistics/season.models';
import { SeasonPsgStatData } from '../models/season-act-gas';

 
export const getAllPsgNsi = createAction(
  '[Season] Get all psg NSI',
  //props<{ data: Psg[] }>()
);

export const getAllPsgNsiOk = createAction(
    '[Season] Get all psg NSI Ok',
    props<{ data: Psg[] }>()
  );

export const getAllPsgNsiError = createAction(
'[Season] Get all psg NSI Err',
props<{ error: Error }>()
);

export const getSeasonsForPsg = createAction(
    '[Season] Get seasons for psg',
    props<{ object: number }>()
);

export const getSeasonsForPsgOk = createAction(
    '[Season] Get seasons for psg Ok',
     props<{ data: Season[] }>()
);

export const getSeasonsForPsgErr = createAction(
    '[Season] Get seasons for psg Err',
     props<{ error: Error }>()
);
  
export const getStatForSeason = createAction(
    '[Season] Get stat for season',
     props<{ seasonId: string }>()
);
export const getStatForSeasonOk = createAction(
    '[Season] Get stat for season Ok',
     props<{ stat: SeasonStats }>()
);
export const getStatForSeasonErr = createAction(
    '[Season] Get stat for season Err',
     props<{ error: Error }>()
);

export const getSeasonsArr = createAction(
  '[Season] Get getSeasonsArr',
  props<{ value: string, from:string, to:string }>()
);

export const getSeasonsArrOK = createAction(
  '[Season] Get getSeasonsArr Ok',
   props<{ data: SeasonPsgStatData[] }>()
);