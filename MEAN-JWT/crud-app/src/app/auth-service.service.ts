import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  register(data:any): Observable<any> {

    let res:any = this.http.post('http://localhost:3000/users/register',data);
    console.log('register response', res)
    return res;

  }
  login(data:any): Observable<any> {

    let res:any = this.http.post('http://localhost:3000/users/login',data);
    console.log('login response', res)
    return res;

  }

}
