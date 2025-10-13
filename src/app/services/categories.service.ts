import { GetProductService } from './get-product.service';
import { Injectable } from '@angular/core';
import { url } from "../../app/core/Api/ApiUrl";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../core/Interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,private _GetProductService:GetProductService) {}


  getProWithCategory(category:string): Observable<any> {
    return this.http.get(`${url}?category=${category}`)
  }

  showBtnGetToCart(products:IProduct[]):void{
    this._GetProductService.showBtnGetToCart(products)
  }
}
