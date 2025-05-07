import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../types/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  searchTerm = '';
  selectedCategory = '';
  selectedColor = '';

  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  products: Product[] = [];


  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category') || '';
      this.searchTerm = params.get('search') || '';
      this.selectedColor = params.get('color') || '';

      this.loadMovies();
    });
}

onCategoryChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const category = target.value;

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { category },
    queryParamsHandling: 'merge',
  });
}

onColorChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const color = target.value;

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { color },
    queryParamsHandling: 'merge',
  });
}


loadMovies() {
  let url = '/api/products';
  const query: string[] = [];

  if (this.selectedCategory) query.push(`category=${encodeURIComponent(this.selectedCategory)}`);
  if (this.searchTerm) query.push(`search=${encodeURIComponent(this.searchTerm)}`);
  if (this.selectedColor) query.push(`color=${encodeURIComponent(this.selectedColor)}`);


  if (query.length) url += '?' + query.join('&');

  this.http.get<Product[]>(url).subscribe(products => {
    this.products = products;
  });
}

    addToCart(product: Product) {
      this.cartService.addToCart(product);
      this.notificationService.showMessage;
    }
    
}
