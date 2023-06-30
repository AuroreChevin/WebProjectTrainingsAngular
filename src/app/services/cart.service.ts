import { Injectable, OnInit } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';
@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
public cart = new Map<number, Training>();
totalAmount : number = 0;
private customer : any;
  constructor() { 
    let cart1 = localStorage.getItem('cart');
    if(cart1){ // le panier existe déjà
      this.cart = new Map(JSON.parse(cart1));
  }else {this.cart = new Map<number,Training>();}
   
}
ngOnInit(): void {
}
  addTraining(training:Training){
    const item: Training | undefined = this.cart.get(training.id);
    if (!item) {
      this.cart.set(training.id, training);
    } else {
      item.quantity += 1;
      
    }
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }
  updateQuantity(training: Training, qty: number) {
    const item: Training | undefined = this.cart?.get(training.id);
    if (qty >= 1) {
      item!.quantity = qty;
      localStorage.setItem('cart',JSON.stringify([...this.cart]));
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
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }
  saveCustomer(customer : Customer){
    console.log("coucou");
    localStorage.setItem('customer',JSON.stringify(customer));
    
  }
  getCustomer(): Customer{
    return this.customer;
  }
}
