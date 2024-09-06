import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../Environment/environment.dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }
  getAllBrands = ():Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/brands')
}
}