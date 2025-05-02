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

  // När vi har ID kan vi hämta ut filmen från backend och för det använder vi HttpClient
  // Vi börjar med att injicera HttpClient in i MovieDetailsComponent
  // Injicerar providern HttpClient som vi kan använda för att kommunicera med backend
  /* private http = inject(HttpClient); */

  // Vi behöver få tag på ID som ligger i URL:en, för detta kan vi använda ActivatedRoute
  // Använd inject() för att injicera tjänster du behöver - i detta fallet för att få ut värden från URL:en
  /* private route = inject(ActivatedRoute); */

  // Vi behöver en variabel för att lagra produkten i
  // Utropstecken berättar för TypeScript att det här värdet kommer tilldelas vid ett senare tillfälle
  /* product!: Product; */

  private productService = inject(ProductService);
  
  private http = inject(HttpClient);
  // Med hjälp av ActivatedRoute kan vi få tag på/plocka ut URL-parametrar
  private route = inject(ActivatedRoute);

  // array av produkter
    products: Product[] = [];

    // värdet kommer tilldelas vid senare tillfälle
    product!: Product;

  // Vi använder här ngOnInit() som är en metod som körs precis innan komponenten renderas i webbläsaren för att hämta ut ID:t i URL:en
  ngOnInit() {
    const urlSlug = this.route.snapshot.params[`urlSlug`];

    // Subsribe, motsvarighet till thenables när man använder fetch
    this.http.get<Product>(`/api/products/${urlSlug}`).subscribe((products) => {
      this.product = products;
    })

      /* const urlSlug = this.route.snapshot.paramMap.get('urlSlug');

      if (urlSlug) {
        // Justera sökvägen till din API-fil eller backend-rutt

        this.http.get<any[]>(`/api/products/${urlSlug}`).subscribe(products => {
          this.product = products.find(p => p.urlSlug === urlSlug);
        });
      }
    } */


    // Med service så kan man återanvända en viss tjänst, som att hämta data från backend
    
      this.productService.getAllProducts().subscribe((products) => {
        this.products = products;
      });
    
    }

  }