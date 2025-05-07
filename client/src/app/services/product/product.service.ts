import { Injectable, inject } from '@angular/core';
import { Product } from '../../types/Product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  // POST
  createProduct(product: Product): Observable<Product> {
      return this.http.post<Product>('/api/products', product)
  }
 
  // DELETE
  deleteProduct(id: number) {
    return this.http.delete(`/api/products/${id}`);
  }

  isNew(product: Product): boolean {
    const today = new Date();
    const created = new Date(product.publishDate);
    const differenceInDays = (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return differenceInDays < 7;
  }
}
