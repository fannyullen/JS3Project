import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  accordionItems = [
    { title: 'Mina sidor', content: ['Mitt konto', 'Mina Ordrar'] },
    { title: 'Kundtjänst', content: ['Returnpolicy', 'Integritetspolicy'] },
    { title: 'Kontakt', content: ['Mejla oss', 'Jobba hos oss'] },
  ];

  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
