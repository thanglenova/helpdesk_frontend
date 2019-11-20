import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
