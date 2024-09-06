import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishListNumber = new BehaviorSubject(0)
  header:any={
    token:localStorage.getItem('token')
  }
  constructor(private _HttpClient: HttpClient) { }

  addToWishList = (productId:string):Observable<any> => {
    return this._HttpClient.post(baseUrl +`api/v1/wishlist`,{
      productId
    },
  {
    headers: this.header
  }) 
  }

  ngOnInit(): void{
    this.getWishlist().subscribe({
      next: (res)=>{
       this.wishListNumber.next(res.count)
    
      }
     })
   }
getWishlist = ():Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/wishlist', 
      {
        headers: this.header
      }
    )  }

    removeItem = (id:string):Observable<any> => {
      return this._HttpClient.delete(baseUrl + `api/v1/wishlist/${id}`, 
        {
          headers: this.header
        }
      )  }
}



