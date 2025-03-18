import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const expectedRole = route.data['expectedRole'].toLowerCase();
    const userRole = this.authService.getUserRole().toLowerCase();
    
    console.log(`Expected Role: ${expectedRole}`);
    console.log(`User Role: ${userRole}`);
    
    if (this.authService.isAuthenticated() && userRole === expectedRole) {
      console.log("Authorization successful");
      return true;
    } else {
      console.log("Authorization failed. Redirecting to login...");
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
