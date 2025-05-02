import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  message: string | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.message$.subscribe(msg => {
      this.message = msg;
    });
  }

  /* tasks: any[] = [
    { id: 1, name: "Storstäda", done: false },
    { id:2, name: "Betala räkningar", done: true}
  ]; */

  // Providern vi lade till precis gör det möjligt för oss att 
  // efterfråga HttpClient. Detta kallas för "dependency injection"
  // och är något vi kommer gå igenom under kursen.
  /* constructor(private http: HttpClient) { */

    // Precis som fetch() kan vi nu använda "http" för att göra
    // anrop till backend

    // Vi skickar ett GET-anrop till backend för att hämta
    // uppgifter.
    /* this.http.get('/api/tasks').subscribe(tasks => {
      // Skriv ut uppgifterna till konsolen i webbläsaren
      console.log(tasks);
    });
  } */
} 
