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

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotal();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
    this.loadCart();
  }
  
  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.loadCart();
  }
  @Input() product!: any;
}
