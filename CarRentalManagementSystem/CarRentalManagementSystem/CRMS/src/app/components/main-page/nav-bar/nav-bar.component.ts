import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  token$: Observable<string | null>;
  userRole$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) {
    this.token$ = this.authService.token$;
    this.userRole$ = this.authService.userRole$;
  }

  onSearch(term: string): void {
    this.token$.subscribe(token => {
      if (token) {
        this.userRole$.subscribe(role => {
          this.router.navigate(['/SearchResult'], { queryParams: { q: term, role: role } });
        });
      } else {
        this.router.navigate(['/Login'], { queryParams: { msg: 'You need to log in to perform a search.' } });
      }
    });
  }

  clearSearch(searchTerm: any): void {
    searchTerm.value = '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
