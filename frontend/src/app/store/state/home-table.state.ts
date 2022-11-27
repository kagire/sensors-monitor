import {Sensor} from "../../services/sensor";

export interface SensorState {
  sensors: Sensor[];

}

export const initialState: SensorState = {
  sensors: [] = []
};
