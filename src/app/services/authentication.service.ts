import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { UserRoleForm } from '../model/user-role-form.model';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userConnected : User = new User('', '', [])
  constructor(private http:HttpClient) { }
  public postUser(username : string, password : string): Observable<any>{
    const formData = new FormData;
    formData.append("username", username);
    formData.append("password", password);
      return this.http.post<any>("http://localhost:8080/login", formData,{observe : 'response'});
    }
    public saveUser(user: any){     
      return this.http.post<User>(environment.host+ '/users', user, {headers: new HttpHeaders({'Authorization' : this.getToken()})});
    }
    
    public postRoleUser(userRoleForm : any){
      return this.http.post<UserRoleForm>(environment.host+ '/roleUser', userRoleForm, {headers: new HttpHeaders({'Authorization' : this.getToken()})});
    }
  public getUser() {
    let user = localStorage.getItem('user');
    if(user){
     this.userConnected = JSON.parse(user);
    }
    return this.userConnected;
  }
  public saveToken(token : string){
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);
    localStorage.setItem('token' , JSON.stringify(token));
    this.userConnected.username = decodeToken.sub;
    this.userConnected.roles = decodeToken.roles;
    localStorage.setItem('user', JSON.stringify(this.userConnected));

  }
  public getToken(){
    let token = localStorage.getItem('token');    
    if(token){ 
      return JSON.parse(token); 
    }
  }
  public clearStorage(){
    localStorage.clear();
  }
  public isLoggedIn(){
    return (this.isAdmin() || this.isUser());   
  }
  decodeToken(token : string){
    return jwt_decode(token);
  }
  isAdmin(){
    let user = this.getUser();
    if(user.roles.length> 0){
      if(user.roles.indexOf('ADMIN')>-1)return true;
    }
    return false;
  }
  isUser(){
    let user = this.getUser();
    if(user.roles.length> 0){
      if(user.roles.indexOf('USER')>-1)return true;
    }
    return false;
  }
}
