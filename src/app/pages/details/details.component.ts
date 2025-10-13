import { IsLoadingService } from './../../services/is-loading.service';
import { GetProductService } from './../../services/get-product.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { FilterProductService } from './../../services/filter-product.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../core/Interfaces/http';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgClass, CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent {

  constructor(private FilterProductService: FilterProductService, private _activatedRoute: ActivatedRoute, public _AddToCartService: AddToCartService, public _IsLoadingService: IsLoadingService) {

  }

  id!: string;
  productDetails!: IProduct[];
  ngOnInit(): void {
   this._AddToCartService.TopScroll()
    this._activatedRoute.paramMap.subscribe((pro: any) => {
      this.id = pro.get("id")
      this.getSinglePro()


    }


    );



  }



  getSinglePro(): void {

    this.FilterProductService.getSinglePro(this.id).subscribe((pro) => {
      let product: IProduct = { ...pro };

      console.log(pro)

      this._AddToCartService.getFRomCart().then((pro) => {


        pro.find((itemInCart: any): any => {
          if (itemInCart.id == product.id) {
            product.CardStatus = true
          }

        }

        )
      })

      this.productDetails = [product]
      if (this.productDetails.length > 0) {
        this._IsLoadingService.setStatus(false, false)
      }
      else if (this.productDetails.length == 0) {
        this._IsLoadingService.setStatus(false, true)

      }



    })


  }


}


