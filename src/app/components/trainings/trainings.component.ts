import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/training.model';
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
      {id: 1, name: 'Java', description: 'Formation Java SE 8 sur 5 jours', quantity: 1, price: 1500,},
      {id:2, name: 'DotNet', description: 'Formation DotNet 3 jours', quantity: 1, price:1000},
      {id:3, name: 'Python', description: 'Formation Python/Django 5 jours', quantity: 1, price:1500,}
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
