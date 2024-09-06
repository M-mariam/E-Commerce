import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../Environment/environment.dev';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemNumber = new BehaviorSubject(0)
  header:any={
    token:localStorage.getItem('token')
  }
  constructor(private _HttpClient: HttpClient) {

   }

   ngOnInit(): void{
    this.getCart().subscribe({
      next: (res)=>{
       this.cartItemNumber.next(res.numOfCartItems)
      }
     })
   }


  addToCart = (productId:string):Observable<any> => {
    return this._HttpClient.post(baseUrl +`api/v1/cart`,{
      productId
    },
  {
    headers: this.header
  }) 
  }

  getCart = ():Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/cart', 
      {
        headers: this.header
      }
    )  }

    updateCart = ( id:string,count:number):Observable<any> => {
      return this._HttpClient.put(baseUrl + `api/v1/cart/${id}`, 
        {
         count:count
        },
        {
          headers: this.header
        }
      )  }
    
  removeItem = (id:string):Observable<any> => {
    return this._HttpClient.delete(baseUrl + `api/v1/cart/${id}`, 
      {
        headers: this.header
      }
    )  }
   
      clearCart = ():Observable<any> => {
        return this._HttpClient.delete(baseUrl + 'api/v1/cart', 
          {
            headers: this.header
          }
        )  }
  }




