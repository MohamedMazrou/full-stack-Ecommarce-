import { AddToCartService } from './../../../../services/add-to-cart.service';
import { FilterProductService } from './../../../../services/filter-product.service';
import { Component, OnInit, } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IProduct } from '../../../../core/Interfaces/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetProductService } from '../../../../services/get-product.service';
import { pro_Titel_Cut_Pipe } from '../../../../pipe/cut-titel-pro.pipe';
import { BehaviorSubject } from 'rxjs';
import { IsLoadingService } from '../../../../services/is-loading.service';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, RouterLink, CommonModule, pro_Titel_Cut_Pipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CardComponent implements OnInit {

  constructor(private _GetProductService: GetProductService, public _AddToCartService: AddToCartService,public _IsLoadingService : IsLoadingService) { }
  allproduct!: IProduct[];
  // filterproduct: IProduct[] = [] ;
  // IDproduct: string[] = [];
  // filterbar !: string;

  // arrFilterBar: string[] = [
  //   "All",
  //   "Popular",
  //   "Cheap",
  //   "Expensive",
  //   "Sale",
  // ];



  ngOnInit(): void {


    this.getpro()



  }


  getpro(): void {
    this._GetProductService.getProduct().subscribe((res) => {
      
      this.allproduct = res.data
      if(this.allproduct.length > 0) {
        this._IsLoadingService.setStatus(false,false)
      }
      
      else if (this.allproduct.length == 0) {
        this._IsLoadingService.setStatus(false, true)

      }
      this._GetProductService.showBtnGetToCart(this.allproduct)
      // this.allproduct.filter(ele => ele.popular).map((product) => { return  { ...product, CardStatus: false } })



    
  }


    )

}

}