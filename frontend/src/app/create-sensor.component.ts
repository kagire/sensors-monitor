import {Component} from '@angular/core';
import {AppService} from './services/app.service';
import {SensorService} from "./services/sensor-service.service";
import {Sensor} from "./services/sensor";

@Component({
  templateUrl: './create-sensor.component.html'
})
export class CreateSensorComponent {

  constructor(private app: AppService, private sensorService : SensorService) {}

  onFormGroupChangeEvent(event : Sensor | null) {
    if(event === null) this.returnHome();
    else this.sensorService.createSensor(event);
  }

  returnHome(){
    this.sensorService.cancelChangesAndReturn();
  }
}
