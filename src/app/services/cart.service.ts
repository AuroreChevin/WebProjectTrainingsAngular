import { Injectable, OnInit } from '@angular/core';
import { Training } from '../training.model';
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  
  constructor() { 
  }
  ngOnInit(): void{
    let cart = localStorage.getItem('cart');
    if(cart){ // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else {this.cart = new Map<number,Training>();}
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
    }
    cart = new Map<number, Training>();
  addTraining(training:Training){
    if(this.cart.get(training.id)){
      this.cart.get(training.id);
    }
    else{
      training = new Training(training.id, training.name, training.description, training.quantity, training.price);
      this.cart.set(training.id, training);
      }
  }
  getCart(){
    return Array.from(this.cart.values());
  }
  clearCart(){
    this.cart.clear();
  }
  deleteTrainingCart(training:Training){
    this.cart.delete(training.id);
  }
}
