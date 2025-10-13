import { FilterProductService } from './../../services/filter-product.service';
import { CategoriesService } from './../../services/categories.service';
import { IProduct } from '../../core/Interfaces/http';
import { GetProductService } from './../../services/get-product.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashSearchProductPipe } from '../../pipe/dash-search-product.pipe';
import { Router, RouterLink } from "@angular/router";
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, addDoc, } from '@angular/fire/firestore';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-dash-products',
  standalone: true,
  imports: [FormsModule, DashSearchProductPipe, RouterLink, NgClass, NgIf],
  templateUrl: './dash-products.component.html',
  styleUrl: './dash-products.component.css',
})
export class DashProductsComponent {
  constructor(
    private router: Router,
    private _GetProductService: GetProductService,
    private _CategoriesService: CategoriesService,
    private _Firestore: Firestore
  ) {}
  Selectcategory: any = '';
  products!: IProduct[];
  showDeleteConfirm: boolean = false;
  showAlert :boolean = false

  // saveProduct!: IProduct[]
  filter!: IProduct[];
  inputSearchProduct: string = '';
  category: string[] = [
    'All',
    'mobile',
    'audio',
    'gaming',
    'tv',
    'laptop',
    'appliances',
  ];
localImage:string | null = ""
  ngOnInit(): void {
  //  this.reload()
      
    this.getProducts();
    this.localImage = localStorage.getItem('UploadImage');
    console.log(this.localImage)

  }

  //api اعادة ملئ الاراي الي في الفايربيس ب محتوايات
  reload(): void {
    this._GetProductService.getProduct().subscribe(async (pro) => {
      const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');
      setDoc(refAllproducts, { products: pro.data });
    });
  }

  async Products() {
    const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');
    const data = await getDoc(refAllproducts);
    return data.data()?.['products'];
  }

  getProducts() {
    this.Products().then((res) => {
      this.products = res;
      this.filter = res;
    });
  }

  getProductByCategory(): void {
    this.products = this.filter.filter(
      (ele: any) => this.Selectcategory.value == ele.category
    );
    if (this.Selectcategory.value == this.category[0]) {
      this.products = this.filter;
    }
  }

  disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }
  enableScroll() {
    document.body.style.overflow = 'auto';
  }

  showDivDelete(): void {
    this.showDeleteConfirm = true;
    this.disableScroll();
  }

  hiddenDivDelete(): void {
    this.showDeleteConfirm = false;
    this.enableScroll();
  }

  id!: number;

  DeleteProduct(): void {
    const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');

    getDoc(refAllproducts).then((res) => {
      const data: IProduct[] = res.data()?.['products'];

      //firebase بتاع العنصر ال هعدل عليه في  id بجيب
      const updatedProducts = data.filter((ele) => ele.id != this.id);

      this.hiddenDivDelete();

      updateDoc(refAllproducts, { products: updatedProducts }).then(() => {
        this.filter = updatedProducts;
        this.products = this.filter;
        this.showAlert = true
         
        this.Selectcategory.value = this.category[0];

    
        // this.products = updatedProducts
      });
     
    });

         setTimeout((): void => {
            this.showAlert = false;
          }, 8000);
  }
}