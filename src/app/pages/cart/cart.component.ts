import { TotalPriceService } from './../../services/total-price.service';
import { IsLoadingService } from './../../services/is-loading.service';
import { FilterProductService } from './../../services/filter-product.service';
import { GetProductService } from './../../services/get-product.service';
import { IProduct } from '../../core/Interfaces/http';
import { AddToCartService } from './../../services/add-to-cart.service';
import { Component, Input } from '@angular/core';
import { pro_Titel_Cut_Pipe } from '../../pipe/cut-titel-pro.pipe';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { idToken } from '@angular/fire/auth';
import { trigger, transition, style, animate } from '@angular/animations';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [pro_Titel_Cut_Pipe, RouterLink,CommonModule, NgxPaginationModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  animations:[
    trigger('deleteAnimation', [
      transition(':leave', [
        animate('300ms ease', style({
          height: 0,
          opacity: 0,
          margin: 0,
          padding: 0
        
        }))
      ])
    ])
  ]
})
export class CartComponent {

  constructor(public TotalPriceService:TotalPriceService,public _AddToCartService: AddToCartService, private _GetProductService: GetProductService, public _FilterProductService: FilterProductService,public _IsLoadingService:IsLoadingService) { }

  p: number = 1
  itemsPerPage: number = 4

  allproductsInCart !: IProduct[];
  PouplerPro !: IProduct[]  ;

  productsPrices !: number[];
  totalPrice !: number;
  Quantity: number = 1;
  // top scrol
  TopScroll(): void {
    this._AddToCartService.TopScroll()
  }

  ngOnInit(): void {
this.TopScroll()
    this._AddToCartService.getFRomCart().then((res: any) => {
      this.allproductsInCart = res

      this.allproductsInCart = this.allproductsInCart.map((ele: IProduct) => {




        return { ...ele, Quantity: 1, basePrice: ele.price }

      })



      this.productsPrices = [];
      for (let i: number = 0; i < this.allproductsInCart.length; i++) {



        this.productsPrices.push(
          this.allproductsInCart[i].discount > 0 ? this.allproductsInCart[i].basePrice * (1 - this.allproductsInCart[i].discount / 100) : this.allproductsInCart[i].basePrice

        )



      }
      this.totalPrice = this.productsPrices.reduce((acc, curr) => acc + curr, 0)

    

    })

    this._GetProductService.get3product().subscribe((pro) => {

      this.PouplerPro = pro.data
  
      this._GetProductService.showBtnGetToCart(this.PouplerPro)

    if (this.PouplerPro.length > 0) {
      this._IsLoadingService.setStatus(false, false)
      // console.log(this.PouplerPro)
    }
    else if (this.PouplerPro.length == 0) {
      this._IsLoadingService.setStatus(false, true)

    }

    })

   
 

  }


  inecrement(product: IProduct): void {
    product.Quantity++
    product.price = product.basePrice * product.Quantity


    this.totalPrice += product.discount > 0 ? product.basePrice * (1 - product.discount / 100): product.basePrice 
    console.log(product)
  }

  decrement(product: IProduct): void {


    if (product.Quantity > 1) {
      product.Quantity--
      product.price = product.basePrice * product.Quantity

      this.totalPrice -= product.discount > 0 ? product.basePrice * (1 - product.discount / 100) : product.basePrice 
    }


  }

  deleteProduct(index: number, product: IProduct): void{

     this.allproductsInCart.splice(index,1)
 

    this.totalPrice -= product.discount ? product.basePrice * (1 - product.discount / 100)  * product.Quantity : product.basePrice * product.Quantity
  

    
  }

  pay():void{
    localStorage.setItem("pay",String(this.totalPrice))
  }

}
