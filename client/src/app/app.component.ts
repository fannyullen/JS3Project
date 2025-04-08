import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  // Providern vi lade till precis gör det möjligt för oss att 
  // efterfråga HttpClient. Detta kallas för "dependency injection"
  // och är något vi kommer gå igenom under kursen.
  constructor(private http: HttpClient) {

    // Precis som fetch() kan vi nu använda "http" för att göra
    // anrop till backend

    // Vi skickar ett GET-anrop till backend för att hämta
    // uppgifter.
    this.http.get('/api/tasks').subscribe(tasks => {
      // Skriv ut uppgifterna till konsolen i webbläsaren
      console.log(tasks);
    });
  }
}
