import { Component, Input } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  imports: [CommonModule, RouterModule],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  @Input() products!: any[];

  currentIndex = 0;
  totalVisible = 3;

  next(): void {
    const maxStartIndex = this.products.length - this.totalVisible;
    this.currentIndex = Math.min(this.currentIndex + this.totalVisible, maxStartIndex);
  }

  previous(): void {
    this.currentIndex = Math.max(this.currentIndex - this.totalVisible, 0);
  }

  get visibleProducts(): Product[] {
    return this.products.slice(this.currentIndex, this.currentIndex + this.totalVisible);
  }

  kortBredd = 220;
gap = 16;

}
