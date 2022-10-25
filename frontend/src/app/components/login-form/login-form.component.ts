import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{

  @Output() private onFormGroupChange = new EventEmitter<any>();

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor() {
    this.loginForm.controls["username"].addValidators([Validators.required, Validators.minLength(3)]);
  }

  onSubmit(){
    if (this.loginForm.valid) this.onFormGroupChange.emit(this.loginForm);
  }
}
