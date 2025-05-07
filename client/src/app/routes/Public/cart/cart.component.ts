import { Component, inject } from '@angular/core';
import { CartContentComponent } from '../../../components/cart-content/cart-content.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/Product';
import { CartService } from '../../../services/cart/cart.service';
import { ProductService } from '../../../services/product/product.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, CartContentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private productService = inject(ProductService);
  
    products: Product[] = [];
  
    ngOnInit() {
      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
      });
  }
}