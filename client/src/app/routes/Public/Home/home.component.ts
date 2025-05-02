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

  // Dependency injection
  // Specifierar att vi vill använda vår service
  // Med hjälp av vår service kan vi hämta alla våra produkter
  private productService = inject(ProductService);

  // types/Product används här istället för any[]. Våra products är lika med En array av våra product-type-objekt. Vårat product-object som vi har i mappen Types
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

    // this.http.get<Movie[]>('/api/movies').subscribe((data) => {
    //   this.movies = data;
    // });
  }

}
