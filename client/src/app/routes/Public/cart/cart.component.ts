import { Component, inject } from '@angular/core';
import { CartContentComponent } from '../../../components/cart-content/cart-content.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/Product';
import { CartService } from '../../../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product/product.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, CartContentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private productService = inject(ProductService);
  
    // types/Product används här istället för any[]
    products: Product[] = [];
  
    // Skicka anrop till backend med ngOnInit
    // Hämtar produkter från backend
    // Istället för att använda http client direkt så använder vi vår service här
    ngOnInit() {
      // Det här returnerar en observable och observable har en subscribe-metod, när den här väl är klar så kommer vi få ut våra produkter
      // Här får vi inte längre våra produkter från backend utan vi får dem från vår service
      // Så home-komponenten behöver inte känna till Http-client
      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
      });
  }
}