import { AddToCartService } from './../../services/add-to-cart.service';
import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  NgModel,
  FormsModule,
} from '@angular/forms';
import { IsLoadingService } from '../../services/is-loading.service';
import { doc, Firestore } from '@angular/fire/firestore';
import { arrayUnion, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-dash-upload-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, FormsModule],
  templateUrl: './dash-upload-product.component.html',
  styleUrl: './dash-upload-product.component.css',
})
export class DashUploadProductComponent {
  constructor(
    private _formBuilder: FormBuilder,
    public IsloadingServices: IsLoadingService,
    private _Firestore: Firestore,
    private _AddToCartService:AddToCartService,
  ) {}
  selectCategory: string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectCategory = this.category[0];
  }
  showAlert: boolean = false;

  category: string[] = [
    'mobile',
    'audio',
    'gaming',
    'tv',
    'laptop',
    'appliances',
  ];
  UploadProduct: FormGroup = this._formBuilder.group({
    image: ['', [Validators.required]],
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
    return this.UploadProduct.get('title');
  }
  getbrand() {
    return this.UploadProduct.get('brand');
  }
  getprice() {
    return this.UploadProduct.get('price');
  }
  getcolor() {
    return this.UploadProduct.get('color');
  }
  getdescription() {
    return this.UploadProduct.get('description');
  }

  imageSrc!: string;
  file!: any;

  chooseImage(val: any): void {
    this.file = val.files[0];
    const readFile = new FileReader();
    readFile.onload = () => {
      this.imageSrc = readFile.result as string;
    };

    readFile.readAsDataURL(this.file);
    val.value = '';
  }

  fnUploadProduct(UploadProduct: FormGroup): void {
    // انا فضيت الصوره عشان في الللوب لما يلاقيها جايه فاضيه يجيب السورس بتاعها من اللوكال استورج
this._AddToCartService.TopScroll()
    this.UploadProduct.value.image = '';
    console.log(UploadProduct.value);
    const refAllproducts = doc(this._Firestore, 'Allproducts', 'Allproducts');
    localStorage.setItem('UploadImage', this.imageSrc);
    this.IsloadingServices.IsLoading = true;

    updateDoc(refAllproducts, {
      products: arrayUnion(UploadProduct.value),
    }).then((res: any) => {
      // this.showAlert = true;
      setTimeout(() => {
        this.IsloadingServices.IsLoading = false;
         this.showAlert = true;

        if(this.showAlert == true){
          setTimeout(()=>{
            this.showAlert = false
            this.imageSrc = ''
            UploadProduct.reset()
            
          },3000)
        }



      }, 4000);
    
    });
   
  }
}
