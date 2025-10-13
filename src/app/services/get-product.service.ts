import { AddToCartService } from './add-to-cart.service';
import { Injectable } from '@angular/core';
import { url } from '../core/Api/ApiUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import e from 'express';
import { __makeTemplateObject } from 'tslib';
import { IProduct } from '../core/Interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(private http_client: HttpClient,private _AddToCartService:AddToCartService) { }

  getProduct(): Observable<any> {
    return this.http_client.get(`${url}`)
  }


showBtnGetToCart(product:IProduct[]){
 

    product.filter((product:any)=> {
      
     this._AddToCartService.getFRomCart().then((res) =>{
      
        res.map((itemInCart:any):any => {
         
          if(itemInCart.id == product.id){
            return product.CardStatus = true 
          }
        })
      


     })
    
    
    })

}

get3product():Observable<any>{
  return this.http_client.get(`${url}?limit=3`)
}


  }
  

