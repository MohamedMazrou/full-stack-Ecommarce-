import { IsLoadingService } from './../../services/is-loading.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetProductService } from '../../../app/services/get-product.service';
import { IProduct } from '../../core/Interfaces/http';
import { CommonModule } from '@angular/common';
import { pro_Titel_Cut_Pipe } from '../../pipe/cut-titel-pro.pipe';
import { NgxSliderModule, Options, LabelType } from '@angular-slider/ngx-slider';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, RouterLink, pro_Titel_Cut_Pipe, NgxSliderModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {


  constructor(private _GetProductService: GetProductService, public _AddToCartService: AddToCartService, public _IsLoadingService: IsLoadingService, ) {
  }

  p: number = 1
  itemsPerPage: number = 30

  allproduct!: IProduct[];
  filteredProducts!: IProduct[];

   arrPrices: number[] = []

  value: number  = 0
  highValue: number  = 0
   

  options  : Options  = {
      floor: this.value,
      ceil: this.highValue,

    };

  ngOnInit(): void {

    this.getpro()
this.TopScroll()
 
  }

  getpro(): void {
    this._GetProductService.getProduct().subscribe((res) => {
      this.allproduct = res.data


      if (this.allproduct.length > 0) {
        this._IsLoadingService.setStatus(false, false)
      }
      else if (this.allproduct.length == 0) {
        this._IsLoadingService.setStatus(false, true)

      }

      this._GetProductService.showBtnGetToCart(this.allproduct)

      this.allproduct.forEach(ele => this.arrPrices.push(ele.price))

    
      this.value = Math.min(...this.arrPrices) 
      this.highValue = Math.max(...this.arrPrices)


      this.options = {
        floor: this.value,
        ceil: this.highValue
      };

  
    


      this.filteredProducts = [...this.allproduct]
       this.filteredPro()

    })



  }



  // top scrol
  TopScroll(): void {
    this._AddToCartService.TopScroll()
  }

  filteredPro(): void {
   
    this.filteredProducts = this.allproduct.filter((product) => {
      return product.price >= this.value && product.price <= this.highValue
    })
  }
}
