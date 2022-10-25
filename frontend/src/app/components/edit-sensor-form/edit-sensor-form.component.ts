import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SensorDto} from "../../services/sensorDto";
import {lastValueFrom} from "rxjs";
import {SensorService} from "../../services/sensor-service.service";
import {Sensor} from "../../services/sensor";

@Component({
  selector: 'app-edit-sensor-form',
  templateUrl: './edit-sensor-form.component.html',
  styleUrls: ['./edit-sensor-form.component.css']
})
export class EditSensorFormComponent{

  sensorTypes : string[];
  sensorUnits : string[];
  savedId : number;
  @Output() private onFormGroupChange = new EventEmitter<any>();

  editForm : FormGroup;

  constructor(private sensorService : SensorService) {
    this.editForm = new FormGroup({
      name: new FormControl(),
      model: new FormControl(),
      rangeFrom: new FormControl(),
      rangeTo: new FormControl(),
      type: new FormControl(),
      unit: new FormControl(),
      location: new FormControl(),
      description: new FormControl()
    })
    this.editForm.controls["name"].addValidators([Validators.required, Validators.maxLength(30)]);
    this.editForm.controls["model"].addValidators([Validators.required, Validators.maxLength(15)]);
    this.editForm.controls["rangeFrom"].addValidators([Validators.required, Validators.min(0)]);
    this.editForm.controls["rangeTo"].addValidators([Validators.required, Validators.min(0)]);
    this.editForm.controls["type"].addValidators([Validators.required]);
    this.editForm.controls["unit"].addValidators([Validators.required]);
    this.editForm.controls["location"].addValidators([Validators.maxLength(40)]);
    this.editForm.controls["description"].addValidators([Validators.maxLength(200)]);
  }

  async ngOnInit(){
    this.sensorService.setupSensorForCreation().subscribe(data => {
      this.savedId = data.sensor.id;
      this.sensorTypes = data.sensorTypes;
      this.sensorUnits = data.sensorUnits;
      this.editForm.patchValue({name: data.sensor.name});
      this.editForm.patchValue({model: data.sensor.model});
      this.editForm.patchValue({rangeTo: data.sensor.rangeTo});
      this.editForm.patchValue({rangeFrom: data.sensor.rangeFrom});
      this.editForm.patchValue({type: data.sensor.type});
      this.editForm.patchValue({unit: data.sensor.unit});
      this.editForm.patchValue({location: data.sensor.location});
      this.editForm.patchValue({description: data.sensor.description});
    });
  }

  validateRangeFrom() {
    const rangeFrom = this.editForm.controls["rangeFrom"];
    const rangeTo = this.editForm.controls["rangeTo"];
    if (rangeTo.value <= 0 && rangeTo.value <= 1) {
      rangeTo.setValue(1);
      rangeFrom.setValue(0);
    } else if (rangeFrom.value >= rangeTo.value) {
      rangeTo.setValue(rangeFrom.value + 1);
    }
  }

  validateRangeTo() {
    const rangeFrom = this.editForm.controls["rangeFrom"];
    const rangeTo = this.editForm.controls["rangeTo"];
    if (rangeTo.value <= 1){
      rangeTo.setValue(1);
      rangeFrom.setValue(0);
    }
    if (rangeTo.value <= rangeFrom.value){
      rangeFrom.setValue(rangeTo.value - 1);
    }
  }

  onSubmit(){
    if (this.editForm.valid) {
      this.onFormGroupChange.emit(new Sensor(this.savedId,
        this.editForm.controls["name"].value,
        this.editForm.controls["model"].value,
        this.editForm.controls["rangeFrom"].value,
        this.editForm.controls["rangeTo"].value,
        this.editForm.controls["type"].value,
        this.editForm.controls["unit"].value,
        this.editForm.controls["location"].value,
        this.editForm.controls["description"].value));
    }
  }

  onReturnHome(){
    this.onFormGroupChange.emit(null);
  }
}
