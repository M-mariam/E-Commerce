import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseUrl } from '../../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }
  getAllProducts = ():Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/products')  }
    
  getAllProduct = (id:string):Observable<any> => {
      return this._HttpClient.get(baseUrl +`api/v1/products/${id}`)  }
}
