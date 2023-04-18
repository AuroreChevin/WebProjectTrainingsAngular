import { Injectable, OnInit } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model'
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  public cart = new Map<number, Training>();
  
  totalAmount = 0;
  constructor() { 
    let cart = localStorage.getItem('cart');
    if(cart){ // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
  }else {this.cart = new Map<number,Training>();}
}
ngOnInit(): void {
  
}
 
  addTraining(training:Training){
    
    if(this.cart.get(training.id)){
      this.cart.get(training.id)?.setQuantity(training.quantity);
    }
    else{
      training = new Training(training.id, training.name, training.description, training.quantity, training.price);
      this.cart.set(training.id, training);      
    }
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }
  getTotalAmount(){
    this.totalAmount = 0;
    this.cart.forEach((t)=>{
        this.totalAmount += (t.quantity*t.price);
    });
    return this.totalAmount; 
  }
  getCart(){
    return Array.from(this.cart.values());
  }
  clearCart(){
    this.cart.clear();
  }
  deleteTrainingCart(training:Training){
    console.log(this.cart);
    this.cart.delete(training.id);
  }
  onSaveCustomer(customer : Customer){
  
  }
  getCustomer(){
  
  }
}
