import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Dekorerar klassen som en Angular-komponent
@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Objekt med innehållet
  accordionItems = [
    { title: 'Mina sidor', content: 'Mitt konto' },
    { title: 'Kundtjänst', content: 'Returnpolicy' },
    { title: 'Kontakt', content: 'Mejla oss' },
  ];

  // Håller koll på vilket index (vilken sektion) som är öppen
  // Null betyder att ingen är öppen
  activeIndex: number | null = null;

  // Funktion som körs när användare klickar på en sektion
  toggleAccordion(index: number): void {
    // Om användaren klickar på en redan öppen sektion --> stäng den
    // Annars --> öppna den valda sektionen
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
