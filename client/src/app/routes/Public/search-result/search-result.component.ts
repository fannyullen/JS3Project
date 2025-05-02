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

  // Dependency injection
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Our movies is an array of our movie-type-object that we have under types
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

  /* // En variabel som håller i värdet i query-strängen
  searchQuery: string = '';

  // En array av de sammanlagda filtrerade produkterna som matchar värdet i query-strängen
  filteredProducts: Product[] = [];

  // Med hjälp av ActivatedRoute kan vi få tag på/plocka ut URL-parametrar / värden som ligger i query-strängen i URL:en
  // jag använder constructor här istället för inject (dependency injection) (för jag vill förstå hur man använder constructor också). Så istället för att injicera ProductService eller ActivatedRoutes, så begär vi dessa genom constructorn
  // En Constructor är en speciell metod som kommer anropas automatiskt i samband med att en instans eller ett objekt av den här klassen skapas upp. Och då kommer vi att ta emot ett objekt av typ activated route, som vi sen kan använda för att plocka ut värdet från URL:en.
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  // Filtrera på frontend

    ngOnInit() {
      // Hämta söksträngen från URL-parametrar (t.ex. ?q=mugg)
      this.route.queryParams.subscribe(params => {
        // query eller tom sträng
        this.searchQuery = params['q'] || '';

        // Hämta alla produkter från backend
        this.productService.getProducts().subscribe(products => {

          const query = this.searchQuery.toLowerCase();

          // Filtrera produkter baserat på namn, kategori eller färg
          this.filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.color.toLowerCase().includes(query)
          );
        });
      });
    } */

    addToCart(product: Product) {
      this.cartService.addToCart(product);
      this.notificationService.showMessage;
    }
    
}
