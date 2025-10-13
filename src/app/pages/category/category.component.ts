import { GetProductService } from './../../services/get-product.service';
import { IsLoadingService } from './../../services/is-loading.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { IProduct } from '../../core/Interfaces/http';
import { RouterLink } from '@angular/router';
import { pro_Titel_Cut_Pipe } from '../../pipe/cut-titel-pro.pipe';
import { CommonModule, NgClass } from '@angular/common';
import { BlobOptions } from 'node:buffer';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, pro_Titel_Cut_Pipe, NgClass, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  constructor(
    private _CategoryiesSrives: CategoriesService,
    public _AddToCartService: AddToCartService,
    public _IsLoadingService: IsLoadingService,
    public IsLoadingService: IsLoadingService
  ) {}
  filteredProducts!: IProduct[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPro('mobile');
    this._AddToCartService.TopScroll();
  }

  category: string[] = [
    'mobile',
    'audio',
    'gaming',
    'tv',
    'laptop',
    'appliances',
  ];
  activationTap: boolean = false;

  getPro(cate: string): void {
    this._CategoryiesSrives.getProWithCategory(cate).subscribe((res) => {
      this.filteredProducts = res.data;
      // console.log(res)
      // console.log(this.filteredProducts)

      if (this.filteredProducts.length > 0) {
        this._IsLoadingService.setStatus(false, false);
      } else if (this.filteredProducts.length == 0) {
        this._IsLoadingService.setStatus(false, true);
      }
      this._CategoryiesSrives.showBtnGetToCart(this.filteredProducts);
    });
    this.activationTap = false;
  }
  selected: string = this.category[0];
  setActive(NameItem: string): void {
    this.selected = NameItem;
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  Active(): void {
    this.activationTap = !this.activationTap;
  }
}
