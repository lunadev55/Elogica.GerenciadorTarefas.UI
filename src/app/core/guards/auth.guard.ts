import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.authService.isAuthenticated();

    if (state.url === '/login') {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    if (isAuthenticated) {      
      if (route.data['roles'] && route.data['roles'].includes('Admin')) {
        if (!this.authService.isAdmin()) {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }
}