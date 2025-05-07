import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../types/Product';

@Component({
  selector: 'app-admin-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {

  private productService = inject(ProductService);

  products: Product[] = [];

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
