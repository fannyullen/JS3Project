import { Injectable } from '@angular/core';
import { Product } from '../../types/Product';
import { ProductService } from '../product/product.service';
import { NotificationService } from '../notification/notification.service';

export interface CartItem {
  product: Product;
  quantity: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private notificationService: NotificationService) {}

  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.notificationService.showMessage('✅ Produkten har lagts till i varukorgen!');
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  clearCart() {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
  }

  increaseQuantity(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity++;
    }
  }
  
  decreaseQuantity(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
  }
}
