import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { baseUrl } from '../../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _Router = inject(Router);
  constructor(private _HttpClient: HttpClient) { }
  signUp = (user: any):Observable<any> => {
    return this._HttpClient.post( baseUrl+'api/v1/auth/signup', user)  };

  logIn = (user: any):Observable<any> => {
      return this._HttpClient.post( baseUrl+'api/v1/auth/signin', user)  }

      getuserdata = ():Observable<any> => {
        return this._HttpClient.get(baseUrl + 'api/v1/wsers')
         }
userData:any
  saveUserData=()=>{
    let token =localStorage.getItem('token')
    if(token){
      try {
        this.userData = jwtDecode(token)
        console.log(token)
      } catch (error) {
        this._Router.navigate(['login'])
       localStorage.clear()
      }
    } 
  }

  forgetPassword = (email: any):Observable<any> => {
    return this._HttpClient.post( baseUrl+'api/v1/auth/forgotPasswords', email)  }

  
   verifyCode = (resetCode: any):Observable<any> => {
      return this._HttpClient.post( baseUrl+'api/v1/auth/verifyResetCode', resetCode)  }

      resetPassword = (newPass: any):Observable<any> => {
        return this._HttpClient.put( baseUrl+'api/v1/auth/resetPassword', newPass)  }
}
