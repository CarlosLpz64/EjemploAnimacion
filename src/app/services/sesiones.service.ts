import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor(private cookie: CookieService, private http: HttpClient) { }

  index(): Observable<any>{
    const url = environment.apiURL + 'sesiones';
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }

  crearSesion(data:any):Observable<any>{
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.post(`${environment.apiURL}sesiones`,data, {headers});
  }

  unirse(data:any):Observable<any>{
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.post(`${environment.apiURL}relacion_sesiones`,data, {headers});
  }

  preguntar(id:string):Observable<any>{
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    const url = environment.apiURL + 'consultaUsuarios/' + id;
    return this.http.get(url, {headers});
  }
}
