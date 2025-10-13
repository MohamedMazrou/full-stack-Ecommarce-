import { IsLoadingService } from './../../services/is-loading.service';
import { TotalPriceService } from './../../services/total-price.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { Component, OnInit } from '@angular/core';
import { regexEmail } from '../../core/regex/regex';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  DocumentSnapshot,
  DocumentData,
  DocumentReference,
  collection,
  addDoc,
} from '@angular/fire/firestore';

import { paymentDataUser } from '../../core/Interfaces/http';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  constructor(
    private _AddToCartService: AddToCartService,
    public _TotalPriceService: TotalPriceService,
    private FormBuilder: FormBuilder,
    private _Firestore: Firestore,
    private _Router: Router,
    public _IsLoadingService: IsLoadingService
  ) {}
  totalPrice!: string | null;
  showAlert: boolean = false;
  showAlertOrder: boolean = false;
  date: Date = new Date();
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._AddToCartService.TopScroll();
    this.totalPrice = localStorage.getItem('pay');
  }

  paymentDataUser: FormGroup = this.FormBuilder.group({
    id: localStorage.getItem('id'),
    ID_order :uuidv4(),
    image: localStorage.getItem('image'),
    street: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    city: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    email: ['', [Validators.pattern(regexEmail)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/[A-Za-z]/),
      ],
    ],
    cardNumber: [
      '',
      [Validators.required, Validators.pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)],
    ],
    cardExpiration: [
      '',
      [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
    ],
    cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    pay: localStorage.getItem('pay'),
    date: [
      `${
        this.date.getMonth() + 1
      }/${this.date.getDate()}/${this.date.getFullYear()}`,
    ],
    // Processing: false,
    // Shipped: false,
    // Delivered: false,
  });

  getData(form: FormGroup): void {
     this._AddToCartService.TopScroll()
    if (form.valid) {
      form.value.id = localStorage.getItem('id');
      form.value.pay = localStorage.getItem('pay');
      form.value.image = localStorage.getItem('image');

      this._IsLoadingService.IsLoading = true;

      const ref = doc(this._Firestore, 'Payment', form.value.id);
      // save all request products
      const ref2 = doc(this._Firestore, 'PaymentAllpro', 'PaymentAllpro');
      // my orders
      const ref3 = doc(this._Firestore, 'Myorders', form.value.id);

      getDoc(ref2).then((res) => {
        // PaymentAllpro بشوف اى دي العنصر موجود ولا لا في
        const checkForid = res
          .data()
          ?.['PaymentAllpro'].some(
            (ele: paymentDataUser) => ele.id === localStorage.getItem('id')
          );

        if (checkForid) {
          this._IsLoadingService.IsLoading = false;
          this.showAlertOrder = true;
          setTimeout(() => {
            this.showAlertOrder = false;
          }, 7000);
        } else if (!checkForid) {
          localStorage.setItem('ID_order', form.value.ID_order);
          updateDoc(ref2, { PaymentAllpro: arrayUnion(form.value) });

          // the products for users
          getDoc(doc(this._Firestore, 'Cart', form.value.id)).then((res) => {
            const ref3 = doc(this._Firestore, 'productForUser', form.value.id);
            setDoc(ref3, { products: res.data()?.['products'] });
          });

          setDoc(ref, { payment: arrayUnion(form.value) }).then((res) => {
            this._IsLoadingService.IsLoading = false;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
              form.reset();
              form.value.date = `${
                this.date.getMonth() + 1
              }/${this.date.getDate()}/${this.date.getFullYear()}`;

            this._Router.navigate(['/user/OrderProgress']);
            }, 7000);
          });
          // my orders
          setDoc(ref3, { MyOrders: arrayUnion(form.value) }, { merge: true });

          updateDoc(ref3, { MyOrders: arrayUnion(form.value) });
          


        }
      });
    } else if (form.invalid) {
      console.log('not valid');
    }
  }
}
