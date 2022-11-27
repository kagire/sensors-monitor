import {createAction} from "@ngrx/store";
import {Sensor} from "../../services/sensor";


export enum ESensorActions{
  AddSensors = '[Sensor] Add sensors',
  GetSensors = '[Sensor] Get sensors',
  UpdateSensors = '[Sensor] Update sensors',
  DeleteSensors = '[Sensor] Delete sensors',
  GetCurrentSensors = '[Sensor] Get current'
}

export const addSensors = createAction(
  ESensorActions.AddSensors,
  (sensor: Sensor) => ({sensor})
);

export const updateSensors = createAction(
  ESensorActions.UpdateSensors,
  (sensors: Sensor[]) => ({sensors})
);

export const getSensors = createAction(
  ESensorActions.GetSensors
);

export const deleteSensors = createAction(
  ESensorActions.DeleteSensors,
  (id: number) => ({id})
);

export const getCurrentSensors = createAction(
  ESensorActions.GetCurrentSensors
);
