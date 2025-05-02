import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../types/Product';
import { CartItem } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-content',
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.css'
})
export class CartContentComponent {
  // Hämta produkter i varukorgen
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    /* this.cartItems = this.cartService.getItems(); */
    this.loadCart();
  }

  // Hämta varukorgens innehåll och totalsumma
  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart(); // uppdatera visningen
    /* this.cartItems = this.cartService.getItems(); */ // uppdatera listan
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    /* this.cartItems = []; */
  }

  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
    this.loadCart();
  }
  
  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.loadCart();
  }  
  // Tar emot data från föräldern CartComponent
  @Input() product!: any;
}
