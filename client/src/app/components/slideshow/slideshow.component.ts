import { Component, Input } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  imports: [CommonModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  // tar emot data från sin förälder
  @Input() products!: any[];

  currentIndex = 0;
  totalVisible = 3;

  // Gå till nästa produkt
  next(): void {
    const maxStartIndex = this.products.length - this.totalVisible;
    this.currentIndex = Math.min(this.currentIndex + this.totalVisible, maxStartIndex);
  }

  // Gå till föregående produkt
  previous(): void {
    this.currentIndex = Math.max(this.currentIndex - this.totalVisible, 0);
  }

  get visibleProducts(): Product[] {
    return this.products.slice(this.currentIndex, this.currentIndex + this.totalVisible);
  }

  kortBredd = 220; // px (inkl. padding + border)
gap = 16; // px mellan kort

// currentIndex räknar i antal kort (t.ex. 0, 1, 2...)
}
