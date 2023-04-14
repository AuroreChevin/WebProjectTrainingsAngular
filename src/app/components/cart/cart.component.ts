import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/training.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  listCart = this.cartService.getCart();
  constructor(private cartService : CartService){}
  onRemoveToCart(training:Training){
    this.cartService.deleteTrainingCart(training);

  }
}
