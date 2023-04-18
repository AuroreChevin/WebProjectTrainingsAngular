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
    return this.http.get<Training[]>("http://localhost:3000"+'/trainings');
  }
  public getTraining(id : number){
    return this.http.get<Training>("http://localhost:3000"+'/trainings/'+id);
  }
}
