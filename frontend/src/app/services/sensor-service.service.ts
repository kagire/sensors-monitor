import {Injectable} from '@angular/core';
import {lastValueFrom, map, Observable} from "rxjs";
import {Sensor} from "./sensor";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {SensorDto} from "./sensorDto";

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  loadSensors() : Observable<Sensor[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Sensor[]>('http://localhost:8080/sensors', {headers: headers});
  }

  setupSensorForCreation() : Observable<SensorDto>{
    let sensorParameter: string = 'new';
    this.route.queryParams.subscribe(params => {
      sensorParameter = params['sensor'];
    });
    return this.performGetSensorsRequest(sensorParameter);
  }

  private performGetSensorsRequest(sensorParameter : string){
    const resp = SensorDto.generateEmptySensorDto();
    return this.http.get<SensorDto>('http://localhost:8080/sensors/modify',
      {params: new HttpParams().set('sensor', sensorParameter)}
    );
  }

  createSensor(sensor : Sensor){
    this.http.post('http://localhost:8080/sensors/modify', sensor,
      {responseType:'text', observe: 'response'})
      .pipe(map(data => {
        if (data.status == 201) {
          this.router.navigateByUrl('/home');
        }
      }
    )).subscribe();
  }

  deleteSensor(id : number){
    return this.http.delete('http://localhost:8080/sensors/modify',
      {responseType: 'text', params: new HttpParams().set('sensorId', id), observe: 'response'})
      .pipe();
/*      .pipe(map(data => {
        console.log(data.status);
      }));*/
  }

  cancelChangesAndReturn(){
    this.router.navigateByUrl("/home");
  }
}
