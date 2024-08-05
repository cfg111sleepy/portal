import { createAction, props } from '@ngrx/store';
import { NSI } from '../features/dashboards/gas-storage-map/gas-storage-map.models';


export const getNSIByObject = createAction(
    '[NSI] Get by object',
    props<{ object: string}>()
);

export const getNSIByObjectOk = createAction(
    '[NSI] Get by object Ok',
    props<{ data: NSI[]}>()
);

export const getNSIByObjectError = createAction(
    '[NSI] Get by object Error',
    props<{error: Error}>()
);