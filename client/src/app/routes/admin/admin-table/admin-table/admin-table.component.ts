import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../types/Product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {

  // Dependency injection
  private productService = inject(ProductService);

  // types/Product används här istället för any[]
  products: Product[] = [];

  // Skicka anrop till backend med ngOnInit
  // Hämtar produkter från backend
  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      error: err => {
        console.error('Fel vid radering:', err);
      }
    });
  }
  
}
