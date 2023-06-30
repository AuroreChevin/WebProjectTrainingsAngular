import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
  
}
