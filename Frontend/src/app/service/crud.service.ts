import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  users: Observable<any>;
  user: Observable<any>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 
     Authorization: this.authService.getToken()
     });

    getAllUsers() {
      const url_api = 'http://localhost:4000/users';
      return this.http.get(url_api);
    }

    getUserById(id: string) {
      const url_api = `http://localhost:4000/users/${id}`;
      return (this.user = this.http.get(url_api));
    }

    saveUsers(user) {
      const token = this.authService.getToken();
      const url_api = `http://localhost:4000/users/register?access_token=${token}`;
      return this.http.post(url_api, user, {headers: this.headers})
      .pipe(map(data => data));
    }

    updateUser(user) {
      const token = this.authService.getToken();
      const url_api = `http://localhost:4000/users/register?access_token=${token}`;
      return this.http.put(url_api, user, {headers: this.headers})
      .pipe(map(data => data));
    }

    deleteUser(id: string) {
      const token = this.authService.getToken();
      const url_api = `http://localhost:4000/users/register?access_token=${token}`;
      return this.http.delete(url_api, {headers: this.headers})
      .pipe(map(data => data));
    }

}
