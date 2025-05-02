import { Injectable, inject } from '@angular/core';
import { Product } from '../../types/Product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Services har ett annat direktiv/decorator här (istället för component i komponenterna): Injectable, som är en så kallad decorator, som används för att markera att den här klassen är något som kan hanteras av Angular och injiceras in i andra klasser, det vi kallar för dependency injection
// Dependency injection är ett mjukvarumönster som gör det möjligt för oss att efterfråga en komponent utan att behöva skapa upp den själv
// Vi har redan sett exempel på dependency injection i home-komponenten, när vi använder "inject(productService)"
// providedIn: 'root' menar på att denna service kommer vara tillgänglig för alla komponenter i vår applikation
// This service is injectable in the components
@Injectable({
  providedIn: 'root'
})

// Vi använder servicar för att kunna dela logik och data mellan olika delar av våran applikation
// Här har vi skapat en service för att göra anrop till backend
// Denna service ansvarar för all logik var gäller anrop till backend
// Vi kan sedan använda denna service för att få tag på data från backend i applikationens komponenter, som att hämta produkter t.ex. från databas
export class ProductService {

  // Injicerar providern HttpClient, vilket gör den tillgänglig för oss att använda för att göra HTTP-anrop till backend
  // Detta är dependency injection
  private http = inject(HttpClient);

  /* product!: Product; */

  // GET (Hämta produkter)
  // Observable - asynkron operation (Likt en promise med fetch)
  // Promise kan bara returnera ett värde, observable kan returnera flera värden över tid löpande tills vi markerar att den är klar
  // Obserable - representerar en operation som kommer ta tid
  // getAllProducts kommer returnera en observable som när den är klar kommer returnera <Product[]> - en array av objekt
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  // POST (New product)
  // använder http för att skicka ett post-anrop till backend, där vi säger att vi skickar med en produkt, och den kommer då returnera en produkt
  createProduct(product: Product): Observable<Product> {
      return this.http.post<Product>('/api/products', product)
  }

  // GET product(id)

  /* getProductId(): Observable<Product> {
      const productId = this.route.snapshot.params['id'];

      return this.http.get<Product>(`/api/products/${productId}`);
        
    } */
 

  // DELETE
  deleteProduct(id: number) {
    return this.http.delete(`/api/products/${id}`);
  }

  // Search
  // Product[] = an array of the product-type
 /*  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8000/api/products/search?q=${query}`);
  } */

  // Nyhet-bricka, typ: boolean
  isNew(product: Product): boolean {
    // Hämta dagens datum
    const today = new Date();
    // Konvertera produktens skapelsedatum till ett Date-objekt
    const created = new Date(product.publishDate);
    // Räkna ut skillnaden i tid (i millisekunder) och omvandla till dagar
    const differenceInDays = (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    // Returnera true om skillnaden är mindre än 7 dagar, annars false
    return differenceInDays < 7;
  }
}
