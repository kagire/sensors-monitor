import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Sensor} from "./sensor";
import {Router} from "@angular/router";
import {lastValueFrom, map} from "rxjs";
import {SensorDto} from "./sensorDto";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class AppService {

  postList : Sensor[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean{
    return localStorage.getItem("authToken") != null;
  }

  resetAuthentication(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("authName");
    localStorage.removeItem("authRole");
  }

  getUsername(){
    return localStorage.getItem("authName");
  }

  getToken(){
    return localStorage.getItem("authToken");
  }

  getRole(){
    return localStorage.getItem("authRole");
  }

  getCurrentRoute(){
    return this.router.url;
  }

  async authenticate(username : string, password : string) {
    this.logout(false);
    this.performAuthRequest(username, password).subscribe({
      next: (data) => {
        if (data.status == 200) {
          localStorage.setItem("authName", username);
          localStorage.setItem("authToken", window.btoa(username + ':' + password));
          if (typeof data.body === "string") {
            localStorage.setItem("authRole", data.body);
          }
          this.router.navigateByUrl('/home');
        }
      },
      error: () => {
        localStorage.removeItem("authName");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRole");
        alert("Authentication failed.");
      }
    })
  }

  private performAuthRequest(username : string, password : string){
    const headers = new HttpHeaders({'Authorization' : 'Basic ' + window.btoa(username + ':' + password)});
    return this.http.get('http://localhost:8080/login',
      {headers : headers, responseType:'text', observe: 'response'});
  }

  logout(needsRedirect: boolean) {
    this.resetAuthentication();
    this.http.get('http://localhost:8080/logout').subscribe();
    if(needsRedirect) this.router.navigateByUrl('/login');
  }
}
