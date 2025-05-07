import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})

export class NewProductComponent {
  
  private productService = inject(ProductService);
  
  private router = inject(Router);

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: [''],
      productPrice: [''],
      description: [''],
      category: [''],
      color: [''],
      image: [''],
      publishDate: [''],
      SKU: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]{3}[0-9]{3}$/)
        ]
      ]
    });
  }

  onSubmit() {
      if (this.productForm.valid) {
        const product = this.productForm.value;
        
        this.productService.createProduct(product).subscribe({
          next: (response) => {
            this.router.navigate(['/admin']);
          },
          error: (err) => {
            console.error('Fel vid skickande till backend:', err);
          }
        });
      } else {
        console.log('Formuläret är ogiltigt');
      }
  }
}
