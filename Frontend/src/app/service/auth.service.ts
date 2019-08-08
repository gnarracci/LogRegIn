import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registerUser(username: string, name: string, password: string, role: string, country: string, description: string) {
    const url_api = 'http://localhost:4000/users/register';
    return this.http.post(url_api, {username: username, name: name, password: password, role: role, country: country, description: description},
      {headers: this.headers}).pipe(map(data => data));
  }

  loginUser(username: string, password: string): Observable<any> {
    const url_api = 'http://localhost:4000/users/login';
    return this.http.post(url_api, {username: username, password: password},{headers: this.headers}).pipe(map(data => data));
  }

  setUser(user): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser() {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    }else{
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://localhost:4000/users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post(url_api,{headres: this.headers});
  }

}
