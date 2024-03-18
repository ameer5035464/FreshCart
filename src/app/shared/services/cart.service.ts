import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  headers:any = {token : localStorage.getItem('eToken')};

  numCartItems:BehaviorSubject<number> = new BehaviorSubject(0);

  addCart(id:string):Observable<any>{

    return this._HttpClient.post(

      'https://ecommerce.routemisr.com/api/v1/cart',

      {
        productId: id
      },

      {
        headers: this.headers
      }
      
      )

  }

  getCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers :this.headers})
  }

  deleteCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`  , {headers :this.headers})
  }

  updateCart(id:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count:count},
    {headers:this.headers})
  }

  checkout(id:any , cartDetails:object):Observable<any>{
    // let currentUrl = window.location.host;
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200/FreshCart`, 
    {
        shippingAddress:cartDetails
    },
    {
      headers : this.headers
    }
    )
  }

  ordersDetails(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }
}
