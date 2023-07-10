import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  httpOptions = new HttpHeaders({ 'Authorization': 'Bearer '});
  constructor(private http:HttpClient) { }
  public getTrainings(){
    return this.http.get<Training[]>(environment.host+'/trainings');
  }
  public postTraining(training : any){
    return this.http.post<Training>(environment.host+'/trainings', training);
  }
  public delTraining(training: Training){
    return this.http.delete<Training>(environment.host+'/trainings/'+ training.id);
  }
  public getTraining(id : number){
    return this.http.get<Training>(environment.host+'/trainings/'+id);
  }
  public getUsers(){
    return this.http.get<User[]>(environment.host +"/users");
  }
 public postUser(username : string, password : string){
   
  const formData = new FormData;
  formData.append("username", username);
  formData.append("password", password);
    return this.http.post<any>("http://localhost:8080/login", formData,  {headers : this.httpOptions});
  }
  /*getCurrentUser(){
    
    return this.http.get(environment.host, httpOptions);
  }*/

}
