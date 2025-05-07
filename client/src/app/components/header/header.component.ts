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

  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
