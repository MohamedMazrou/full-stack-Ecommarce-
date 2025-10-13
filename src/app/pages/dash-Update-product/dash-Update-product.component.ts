import { IsLoadingService } from './../../services/is-loading.service';
import { IProduct } from './../../core/Interfaces/http';
import { fileURLToPath } from 'node:url';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductService } from '../../services/filter-product.service';
import { NgIf, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { url } from '../../core/Api/ApiUrl';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
// import { NgIf } from "../../../../node_modules/@angular/common/index";
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, addDoc, } from '@angular/fire/firestore';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
  selector: 'app-dash-uptade-product',
  standalone: true,
  imports: [NgIf, NgClass, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './dash-Update-product.component.html',
  styleUrl: './dash-Update-product.component.css',
})
export class DashUptadeProductComponent {
  constructor(
    public IsloadingServices: IsLoadingService,
    private router: Router,
    private _Firestore: Firestore,
    private _activatedRoute: ActivatedRoute,
    private _FilterProductService: FilterProductService,
    private _formBuilder: FormBuilder,
    private _addTocart:AddToCartService
  ) {}


  category: string[] = [
    'mobile',
    'audio',
    'gaming',
    'tv',
    'laptop',
    'appliances',
  ];
  TheProduct!: IProduct;

  showDeleteConfirm: boolean = false;
  showAlert: boolean = false;
  textAlert: string = '';
  id!: string;
  showNewImage: boolean = false;
  imageSrc!: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.id = res.get('id');
      this.product();
    });
  }

  newUpdatePro: FormGroup = this._formBuilder.group({
    image: '',
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    brand: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    price: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
    category: '',
    color: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
  });

  gettitle() {
    return this.newUpdatePro.get('title');
  }
  getbrand() {
    return this.newUpdatePro.get('brand');
  }
  getprice() {
    return this.newUpdatePro.get('price');
  }
  getcolor() {
    return this.newUpdatePro.get('color');
  }
  getdescription() {
    return this.newUpdatePro.get('description');
  }

  product(): void {
    this._FilterProductService
      .getSinglePro(this.id)
      .subscribe((pro: IProduct) => {
        this.TheProduct = pro;
        this.newUpdatePro.patchValue(this.TheProduct);
      });
  }

  file!: any;

  changImage(val: any): void {
    this.file = val.files[0];
    this.showNewImage = true;
    const readFile = new FileReader();
    readFile.onload = () => {
      this.imageSrc = readFile.result as string;
      this.newUpdatePro.value.image = this.imageSrc;
    };

    readFile.readAsDataURL(this.file);
    val.value = '';
  }

  resetImage(): void {
    this.showNewImage = false;
    // this.newUpdatePro.value.image = this.TheProduct.image ;
    // this.TheProduct.image = this.newUpdatePro.value.image
     this.imageSrc = this.TheProduct.image;
  }
  UpdateProduct(form: FormGroup): void {
    this._addTocart.TopScroll()
    this.IsloadingServices.IsLoading = true
    const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');

    const obj = {
      id: this.TheProduct.id,
      title: form.value.title,
      popular: this.TheProduct.popular == true,
      price: form.value.price,
      description: form.value.description,
      image: this.imageSrc  || this.TheProduct.image ,
      category: form.value.category,
      brand: form.value.brand,
      model: this.TheProduct.model,
      color: form.value.color,
      discount: this.TheProduct.discount || 0,
    };

    getDoc(refAllproducts).then((res) => {
      const data: IProduct[] = res.data()?.['products'];

      //firebase بتاع العنصر ال هعدل عليه في  id بجيب
      const updatedProducts = data.map((ele: IProduct): any => {
        if (ele.id == +this.id) {
          console.log(obj);
          return { ...ele, ...obj };
        }
        return ele;
      });

      updateDoc(refAllproducts, { products: updatedProducts }).then(() => {
            this.IsloadingServices.IsLoading = false;

        this.textAlert = 'done successfully update product';
        this.showAlert = true;
      });
    });

    setTimeout((): void => {
      this.showAlert = false;
    }, 8000);
  }

  disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }
  enableScroll(): void {
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

  DeleteProduct(): void {
    const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');

    getDoc(refAllproducts).then((res) => {
      const data: IProduct[] = res.data()?.['products'];

      //firebase بتاع العنصر ال هعدل عليه في  id بجيب
      const updatedProducts = data.filter((ele) => ele.id != +this.id);

      this.hiddenDivDelete();

      updateDoc(refAllproducts, { products: updatedProducts }).then(() => {
        this.textAlert = 'done successfully delete product';
        this.showAlert = true;
        setTimeout((): void => {
          this.showAlert = false;
          this.router.navigate(['dashboard/products/']);
        }, 6000);
      });
    });
  }
}