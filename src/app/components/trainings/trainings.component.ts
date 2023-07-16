import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit{
  listTrainings : Training[] | undefined;
  error: null | undefined;
  
  constructor(private cartService : CartService, private apiService: ApiService,
    private router : Router) { }
  ngOnInit(): void{
    this.getAllTrainings();
  }
   /* this.listTrainings = [
      new Training(1, 'Java', 'Formation Java SE 8 sur 5 jours', 1, 1500),
      new Training(2, 'DotNet', 'Formation DotNet 3 jours', 1, 1000),
      new Training(3, 'Python', 'Formation Python/Django 5 jours', 1, 1500)
    ];*/
  getAllTrainings(){
    this.apiService.getTrainings().subscribe({
      next: (data) => {this.listTrainings = data;
      console.log(this.listTrainings)},
      error: (err) => this.error = err.message,
      complete: () => this.error = null,
    });
  }
  onAddToCart(training:Training){
    if(training.quantity > 0){
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
    }
  }
  deleteTraining(training : Training){
      this.apiService.delTraining(training).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
      this.router.navigateByUrl('trainings');
  }
  updateTraining(training :Training){
    this.router.navigateByUrl('training');
  }
}
