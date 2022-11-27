import {Component} from '@angular/core';
import {AppService} from './services/app.service';
import {SensorService} from "./services/sensor-service.service";
import {Sensor} from "./services/sensor";
import {Store} from "@ngrx/store";
import {SensorState} from "./store/state/home-table.state";
import {addSensors} from "./store/action/home-table.actions";

@Component({
  templateUrl: './create-sensor.component.html'
})
export class CreateSensorComponent {

  constructor(private app: AppService, private sensorService : SensorService, private store: Store<SensorState>) {}

  onFormGroupChangeEvent(event : Sensor | null) {
    if(event === null) this.returnHome();
    else this.store.dispatch(addSensors(event));
  }

  returnHome(){
    this.sensorService.cancelChangesAndReturn();
  }
}
