import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})

export class NewProductComponent {

  // template-driven formulär
  // 
  private productService = inject(ProductService);
  // Vi injicerar något som kallas router, och med hjälp av router kan vi programmatiskt skicka användaren till en annan sida. T.ex. skickas till en annan sida när man trycker på en knapp i ett formulär.
  private router = inject(Router);

  // En egenskap som heter FormGroup
  // productForm är ett objekt av alla värden från input-fält
  productForm!: FormGroup;

  // ngOnInit = En Livscykelmetod som körs precis innan komponenten visas i webbläsaren, och här sätter vi värdet
  ngOnInit() {
    // Skapa en FormControl för varje fält i formuläret
    // FormGroup representerar en samling av formulär-kontroller och vi använder den för att hålla reda på värdena i fälten i formuläret samt huruvida de är giltiga eller ej
    // Och det är såhär det ser ut när man ska integrera ett formulär in i Angular, man använder en form group
    this.productForm = new FormGroup({
      productName: new FormControl(''),
      productPrice: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      color: new FormControl(''),
      image: new FormControl(''),
      publishDate: new FormControl(''),
    });
  }

  // Nu när vi har en formulärgrupp så vill vi associera den till formuläret, vi lägger till ett direktiv i HTML:en

  // En funktion för att skicka informationen från fälten till backend när man klickar på submit-knappen
  onSubmit() {
    // Formulärdatan
    const product = this.productForm.value;

    // productService ansvarar för kommunikationen med backend
    // returnerar observable - subscribe metoden (som .then)
    this.productService.createProduct(product).subscribe((response) => {
      // Navigerar programmatiskt till home page med hjälp av router
      this.router.navigate(['/admin']);
    });
  }
}
