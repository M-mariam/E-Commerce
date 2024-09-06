import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseUrl } from '../../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }
  getAllCategories = ():Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/categories')  }
}
