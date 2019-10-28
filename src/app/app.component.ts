import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerService: AlertService
  ) {
  }

  ngOnInit() {
  }


  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}


