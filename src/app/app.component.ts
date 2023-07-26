import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ApiService } from './services/api.service';
import { Training } from './model/training.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  listTrainings : Training[] =[];
  error: null | undefined;
  constructor(private authService : AuthenticationService, private apiService : ApiService){}
  title = 'Shop';
  ngOnInit(): void {;
  }
  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  public logout(){
    this.authService.clearStorage();
  }
  getAllTrainings(){
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
