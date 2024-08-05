import { createAction, props } from '@ngrx/store';
import { AgsiApiResp } from '../features/dashboards/agsi-gie-eu/agsi-gie-eu.models';


export const getGasDay = createAction(
    '[AGSI] Get gas day',
    props<{ date: string }>()
);
export const getGasDayOk = createAction(
    '[AGSI] Get gas day Ok',
    props<{ data: AgsiApiResp }>()
);

export const getGasDayErr = createAction(
    '[AGSI] Get gas day Error',
    props<{ error: Error }>()
);

export const getHist = createAction(
    '[AGSI] Get Hist',
    props<{ from: string, to: string, code:string }>()
);
export const getHistOk = createAction(
    '[AGSI] Get Hist Ok',
    props<{ data: AgsiApiResp }>()
);
export const getHistErr = createAction(
    '[AGSI] Get Hist Error',
    props<{ error: Error }>()
);

export const getGasDayLastYear = createAction(
    '[AGSI] Get gas day lastY',
    props<{ date: string }>()
);
export const getGasDayOkLastYear = createAction(
    '[AGSI] Get gas day Ok  lastY',
    props<{ data: AgsiApiResp }>()
);
