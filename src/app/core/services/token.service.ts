import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  readonly jwtToken = 'currentUser';

  saveToken(token: string) {
    localStorage[this.jwtToken] = token;
  }

  getToken(): string {
    return localStorage[this.jwtToken];
  }

  clearToken(): void {
    localStorage.removeItem(this.jwtToken);
  }
}
