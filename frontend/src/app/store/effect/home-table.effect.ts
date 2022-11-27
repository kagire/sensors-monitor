import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {SensorService} from "../../services/sensor-service.service";
import {map, mergeMap} from "rxjs";
import {
  addSensors,
  deleteSensors,
  ESensorActions,
  getCurrentSensors,
  getSensors,
  updateSensors
} from "../action/home-table.actions";

@Injectable()
export class HomeTableEffect {

  constructor(private actions$: Actions, private service: SensorService) {}

  public getSensors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ESensorActions.GetSensors),
        mergeMap(() =>
            this.service.loadSensors().pipe(
              map(sensors => {
                return updateSensors(sensors)
              })
          )
        )
      )
  );

  public addSensors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSensors),
        map(action => {
          this.service.createSensor(action.sensor);
          return getSensors();
        })
      )
  );

  public deleteSensors = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteSensors),
        map(action => {
          this.service.deleteSensor(action.id);
          return getCurrentSensors();
        })
      )
  );
}
