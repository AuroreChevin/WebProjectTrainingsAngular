import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public listCart = this.cartService.getCart();
  public total = this.cartService.getTotalAmount();
  constructor(private cartService : CartService){}
ngOnInit(): void {
  
}
  onRemoveToCart(training:Training){
    this.cartService.deleteTrainingCart(training);
  }
  
}
