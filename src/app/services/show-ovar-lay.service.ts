import e from 'express';
import { IProduct } from './../core/Interfaces/http';
import { GetProductService } from './get-product.service';
import { Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowOvarLayService {
 public searchInp :string = ""
  allProducts !: IProduct[];
//  public searchInpMobile :string = ""
 public none :boolean= false
  constructor() { 
   
  }
 
  public show_OvarLay : boolean = false


  statusShow(value:string):void{

    this.searchInp = value 

    if(this.searchInp.length > 0 ){
      this.show_OvarLay = true

    }
    else if (this.searchInp.length == 0){

      this.show_OvarLay = false
       this.none = false
    }



 
  }


  

}
