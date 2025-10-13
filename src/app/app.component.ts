import { ShowproductforUserService } from './services/showproductfor-user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routeAnimations } from '../app/environment/route-animations';
import { ShowOvarLayService } from './services/show-ovar-lay.service';
import { GetProductService } from './services/get-product.service';
import { IProduct } from './core/Interfaces/http';
import { SearchProductsPipe } from './pipe/search-products.pipe';
import { NgClass, NgIf } from '@angular/common';
// import { CommonModule, NgClass } from "../../node_modules/@angular/common/index";
import { trigger, transition, style, animate } from '@angular/animations';
import { pro_Titel_Cut_Pipe } from './pipe/cut-titel-pro.pipe';
import { FilterProductService } from './services/filter-product.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchProductsPipe, NgClass, pro_Titel_Cut_Pipe, NgIf,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimations ]

})
export class AppComponent {
  title = 'ecommarce';
  constructor(public _ShowOvarLayService: ShowOvarLayService, private _getproducts: GetProductService,private _ShowproductforUserService:ShowproductforUserService){
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getProducts()

  }

  allProducts!:IProduct[];

  getProducts() :void{
    this._getproducts.getProduct().subscribe((res)=>{
      this.allProducts = res.data;
    })

  }



}
