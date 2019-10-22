import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}
  

  isLogged(): boolean{
    return this.authService.isLoggedIn();
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}


