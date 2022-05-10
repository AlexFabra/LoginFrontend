import { AuthResponse, User } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor(private http: HttpClient) { }

  get user(): User {
    return { ...this._user }
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => { //obtenemos la respuesta
          if (resp.ok) {
            //guardamos el token en localStorage para que se mantenga la informacion del usuario
            localStorage.setItem('token', resp.token!);
            this._user =
            {
              name: resp.name!,
              uid: resp.uid!,
              email:resp.email!
            }
          }
        }),
        map(resp => resp.ok), //la modificamos para enviarla
        catchError(err => of(err.error.msg)) //si hay error, enviamos false
      );
  }

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => { //obtenemos la respuesta
          if (resp.ok) {
            //guardamos el token en localStorage para que se mantenga la informacion del usuario
            localStorage.setItem('token', resp.token!);
            this._user =
            {
              name: resp.name!,
              uid: resp.uid!,
              email:resp.email!
            }
          }
        }),
        map(resp => resp.ok), //la modificamos para enviarla
        catchError(err => of(err.error.msg)) //si hay error, enviamos false
      );
  }

  /** renew tracta de renovar el token
   * @returns true en cas de que hagi sigut possible
   */
  renew(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          console.log(resp);
          //guardamos el token en localStorage para que se mantenga la informacion del usuario
          localStorage.setItem('token', resp.token!);
          this._user =
          {
            name: resp.name!,
            uid: resp.uid!,
            email:resp.email!
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    //borramos todo el localStorage del sitio web
    localStorage.clear();
  }




}
