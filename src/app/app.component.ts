import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {

  private subscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  profile(): void {
    this.subscription = this.authService.getProfileCurrent().subscribe(
      data => {
        this.router.navigate(['/profile/' + data.id]);
      }, error => {

      });
  }
}