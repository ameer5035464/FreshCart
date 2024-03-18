import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterPostService {

  constructor(private _HttpClient:HttpClient ,private _Router:Router) { }

  userData:any;

  signOut():void{
    localStorage.removeItem('eToken');

    this._Router.navigate(['/login']);
  }

  saveUserData(){
    if (localStorage.getItem('eToken') != null) {

      let decodeToken:any = localStorage.getItem('eToken');
      
      let decodedData = jwtDecode(decodeToken);

      this.userData = decodedData;

      // console.log(this.userData.id);
      
    }
  }

  postForm(registerData:object):Observable<any>{
    return  this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,registerData);
  }

  postLog(userdata:object):Observable<any>
  {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userdata)
  }

  postForgetPass(email:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` ,email )
  }

  postVerifyResetCode(resetCode:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , resetCode)
  }

  putResetPassword(resetPassword:any):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,resetPassword)
  }
  
}
