import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Product } from '../../../types/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product/product.service'
import { ProductGridComponent } from '../../../components/product-grid/product-grid.component';
import { HeroComponent } from '../../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ProductGridComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
