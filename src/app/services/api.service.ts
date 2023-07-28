import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import { UserRoleForm } from '../model/user-role-form.model';
import { Category } from '../model/category.model';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient, private authService : AuthenticationService) { }
  public getTrainings(){
    return this.http.get<Training[]>(environment.host+'/trainings');
  }
  public getCategories(){
    return this.http.get<Category[]>(environment.host+'/categories');
  }
  public getTrainingsByCategoryId(id : number){
    return this.http.get<Training[]>(environment.host + '/trainings/category/'+id);
  }
  public postTraining(training : any){
    return this.http.post<Training>(environment.host+'/trainings/addtraining', training, {headers: new HttpHeaders({'Authorization' : this.authService.getToken()})});
  }
  public delTraining(training: Training){
    return this.http.delete<Training>(environment.host+'/trainings/'+ training.id, {headers: new HttpHeaders({'Authorization' : this.authService.getToken()})});
  }
  public getTraining(id : number){
    return this.http.get<Training>(environment.host+'/trainings/'+id);
  }
  public getUsers(){
    return this.http.get<User[]>(environment.host +"/users", {headers: new HttpHeaders({'Authorization' : this.authService.getToken()})});
  }
  public getRoles(){
    return this.http.get<Role[]>(environment.host +"/roles", {headers: new HttpHeaders({'Authorization' : this.authService.getToken()})});
  }

  public postPhoto(file : File, id : number){
    console.log("coucou")
   let  formData : FormData = new FormData();
   formData.append('file', file);
   return this.http.post<any>(environment.host+'/photo/'+id, formData, {headers: new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  /*getCurrentUser(){
    
    return this.http.get(environment.host, httpOptions);
  }*/

}
