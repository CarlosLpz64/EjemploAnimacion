import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http:HttpClient) { }

  login(data:any):Observable<any>{
    return this.http.post(`${environment.apiURL}login`,data);
  }

  registrarse(data:any):Observable<any>{
    return this.http.post(`${environment.apiURL}users`,data);
  }
}
