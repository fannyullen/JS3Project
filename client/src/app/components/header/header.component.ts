import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
// export gör klassen tillgänglig för import i andra filer
export class HeaderComponent {

  searchTerm = '';
  selectedCategory = '';

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  applySearch() {

    this.router.navigate([`/search/result`], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm},
      queryParamsHandling: 'merge',
    });
  }


  // Här skapas en variabel som heter showSearch
  // Den är av typen boolean
  // Den styr om sökrutan ska visas (true) eller inte (false)
  // Den börjar med false, alltså är sökrutan gömd från början
  showSearch: boolean = false;

  // En funktion som växlar värdet på showSearch
  // !this.showSearch betyder "motsatsen till det nuvarande värdet"
  // Om showSearch är false, blir det true, om det är true, blir det false
  // Det gör att varje gång du klickar på knappen, visas eller göms sökrutan
  // Du kopplar den till en klickhändelse i HTML
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  /* searchQuery: string = ''; */ // bind till sökrutan

  // Vi behöver använda router och får tillgång till Router här genom constructor
  /* constructor(private router: Router) {} */

  // Navigera till sökresultatsidan med sökningen i query string
  /* onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate([`/search/result`], {
        // trim() removing white spaces
        queryParams: { q: this.searchQuery.trim() },
      });
      this.searchQuery = ''; // rensa sökfältet
    }
  } */
}
