import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public apiService : ApiService) { }
  public setRoles(roles: any){
    localStorage.setItem("roles",roles);
  }
  public getRoles() {
    return localStorage.getItem("roles");
  }
  public setToken(token : string){
    localStorage.setItem("token", token);
  }
  public getToken(){
    return localStorage.getItem("token");
  }
  public clearStorage(){
    localStorage.clear();
  }
  public isLoggedIn(){
    return this.getToken();   
  }
  
}
