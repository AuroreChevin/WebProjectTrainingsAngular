import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  listCart : Training[] | undefined;
  constructor(private cartService : CartService){}
ngOnInit(): void {
  this.listCart = this.cartService.getCart();
  
}
  onRemoveToCart(training:Training){
    this.cartService.deleteTrainingCart(training);
  }
  onUpdateQty(training:Training, qty: number){
    this.cartService.updateQuantity(training,qty);
  }
}
