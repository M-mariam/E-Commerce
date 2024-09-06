import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  header:any={
    token:localStorage.getItem('token')
  }
  constructor(private _HttpClient: HttpClient) { }
  checkOutSession = (cartId:string, shippingAddress:object):Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/orders/checkout-session/'+ cartId +"?url=http://localhost:4200",{
      shippingAddress}, {
        headers:this.header
      })
  }
}
