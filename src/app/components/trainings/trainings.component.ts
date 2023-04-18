import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit{
  listTrainings : Training[] | undefined;
  cart = new Map<number, Training>();
  constructor(private cartService : CartService, private router : Router) { }
  ngOnInit(): void{
    this.listTrainings = [
      new Training(1, 'Java', 'Formation Java SE 8 sur 5 jours', 1, 1500),
      new Training(2, 'DotNet', 'Formation DotNet 3 jours', 1, 1000),
      new Training(3, 'Python', 'Formation Python/Django 5 jours', 1, 1500)
    ];
    
  }
  onAddToCart(training:Training){
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
    console.log(training.name)
    console.log(training.quantity);
    console.log(this.cartService)
  }

}
