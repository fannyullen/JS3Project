import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../types/Product';
import { ProductService } from '../../services/product/product.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {

  constructor(private cartService: CartService, private productService: ProductService, private notificationService: NotificationService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.notificationService.showMessage;
  }

  isNew(product: Product): boolean {
    return this.productService.isNew(product);
  }

  @Input() products!: any[];
}
