import {Sensor} from "./sensor";

export class SensorDto{

  sensor : Sensor;
  sensorTypes : string[];
  sensorUnits : string[];

  constructor(sensor: Sensor, sensorTypes: string[], sensorUnits: string[]) {
    this.sensor = sensor;
    this.sensorTypes = sensorTypes;
    this.sensorUnits = sensorUnits;
  }

  public static generateEmptySensorDto() : SensorDto{
    return new SensorDto(Sensor.generateEmptySensor(), [], []);
  }
}
