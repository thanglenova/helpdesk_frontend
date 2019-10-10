import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  isCollapsed = false;

  private authService: AuthService;

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }
}


