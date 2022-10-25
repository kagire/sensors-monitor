import {Component, Output, EventEmitter } from '@angular/core';
import { AppService } from './services/app.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(private app: AppService) {}

  onFormGroupChangeEvent(event : FormGroup) {
    this.loginForm = event;
    this.login(event.controls["username"].value, event.controls["password"].value);
  }

  login(name : string, password : string) {
    this.app.authenticate(name, password);
  }
}
