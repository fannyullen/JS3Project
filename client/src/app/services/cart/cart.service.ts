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

  // Hämta nuvarande varukorgsinnehåll
  getItems(): CartItem[] {
    return this.items;
  }

  // Lägg till produkt i varukorgen
  addToCart(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    // Om produkten redan finns - öka kvantiteten
    if (existingItem) {
      existingItem.quantity++;
      // Annars - lägg till produkt med ny kvantitet: 1
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.notificationService.showMessage('✅ Produkten har lagts till i varukorgen!');
  }

  // Ta bort en särskilld produkt ur varukorgen
  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Töm hela varukorgen
  clearCart() {
    this.items = [];
  }

  // Beräkna totalpris för alla produkter i varukorgen
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
        this.removeFromCart(productId); // tar bort helt om antal blir 0
      }
    }
  }
}
