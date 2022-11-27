import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SensorState} from "../state/home-table.state"

const _sensorState = createFeatureSelector<SensorState>('sensors');

export const selectSensors = createSelector(_sensorState, (state) => state.sensors);
