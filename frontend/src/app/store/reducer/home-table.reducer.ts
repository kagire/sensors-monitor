import {Action, createReducer, on} from "@ngrx/store";
import {initialState, SensorState} from "../state/home-table.state";
import {addSensors, getCurrentSensors, getSensors, updateSensors} from "../action/home-table.actions";


export const sensorReducer = createReducer(
  initialState,
  on(
    addSensors,
    (state, {sensor}) => ({
      ...state,
      sensors: [...state.sensors, sensor]
    })
  ),
  on(
    getSensors,
    (state) => ({
      ...state
    })
  ),
  on(
    updateSensors,
    (state, {sensors}) => {
      return { ...state, sensors: sensors };
    }),
  on(
    getCurrentSensors,
    (state) => ({
      ...state
    })
  )
);

export function reducer(state: SensorState | undefined, action: Action) {
  return sensorReducer(state, action);
}
