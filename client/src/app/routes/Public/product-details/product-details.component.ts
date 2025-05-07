import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/Product';
import { DetailsCardComponent } from "../../../components/details-card/details-card.component";
import { SlideshowComponent } from "../../../components/slideshow/slideshow.component";
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, DetailsCardComponent, SlideshowComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  private productService = inject(ProductService);
  
  private http = inject(HttpClient);
  
  private route = inject(ActivatedRoute);

    products: Product[] = [];

    product!: Product;

  ngOnInit() {
    const urlSlug = this.route.snapshot.params[`urlSlug`];

    this.http.get<Product>(`/api/products/${urlSlug}`).subscribe((products) => {
      this.product = products;
    })

      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
      });
    
    }

  }