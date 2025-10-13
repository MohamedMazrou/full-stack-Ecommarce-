import { AddToCartService } from './../../services/add-to-cart.service';
import { IProduct } from './../../core/Interfaces/http';
import { Component ,CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, Pipe} from '@angular/core';
import { CardComponent } from "../../shared/shared-module/card/card/card.component";

import { CommonModule, NgClass } from '@angular/common';
import { GetProductService } from '../../services/get-product.service';
import { RouterLink } from '@angular/router';
import { pro_Titel_Cut_Pipe } from '../../pipe/cut-titel-pro.pipe';
import { IsLoadingService } from '../../services/is-loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgClass, RouterLink, CommonModule,pro_Titel_Cut_Pipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  constructor(private _GetProductService: GetProductService,public _IsLoadingService : IsLoadingService, private _AddToCartService:AddToCartService) { 
    this.getpro()
  }

  smallproducts!:IProduct[];
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this._AddToCartService.TopScroll()
}

  getpro(): void {
    this._GetProductService.getProduct().subscribe((res) =>{

      this.smallproducts = res.data.slice(0, 4);
    if (this.smallproducts.length > 0) {
      this._IsLoadingService.setStatus(false, false)
    }

    else if (this.smallproducts.length == 0) {
      this._IsLoadingService.setStatus(false, true)

    }
    }

  )}
    

  }

