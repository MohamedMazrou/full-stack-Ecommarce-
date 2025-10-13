import { ShowproductforUserService } from './../../services/showproductfor-user.service';
import { Component, OnInit } from '@angular/core';
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
} from '@angular/fire/firestore';

import { CommonModule, NgClass, NgIf } from '@angular/common';
import { paymentDataUser } from '../../core/Interfaces/http';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HiddenNumberCardPipe } from '../../pipe/hidden-number-card.pipe';
import { FormsModule } from '@angular/forms';
import { SearchMangementOrderPipe } from '../../pipe/search-mangement-order.pipe';

@Component({
  selector: 'app-dash-order-management',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CommonModule,
    RouterOutlet,
    FormsModule,
    RouterLink,
    HiddenNumberCardPipe,
    SearchMangementOrderPipe,
  ],
  templateUrl: './dash-order-management.component.html',
  styleUrl: './dash-order-management.component.css',
})
export class DashOrderManagementComponent {
  constructor(
    private _Firestore: Firestore,
    private _ShowproductforUserService: ShowproductforUserService
  ) {}
  arrPaymentDataUser!: paymentDataUser[];
  inputSearchProduct: string = '';
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.getDataPaymetUser();
  }

  getDataPaymetUser(): void {
    const ref = doc(this._Firestore, 'PaymentAllpro', 'PaymentAllpro');
    getDoc(ref).then((res) => {
      this.arrPaymentDataUser = res.data()?.['PaymentAllpro'];
    });
  }

  showproductforUser(id: string, paymentDataUser?: paymentDataUser): void {
    const ref = doc(this._Firestore, 'Myorders', id);
    getDoc(ref).then((res) => {
      const pro = res.data()?.['MyOrders'].map((res: paymentDataUser) => {
        if (localStorage.getItem('ID_order') == res.ID_order) {
          return {
            ...res,

            id: paymentDataUser?.id,
            ID_order: paymentDataUser?.ID_order,
            image: paymentDataUser?.image,
            street: paymentDataUser?.street,
            city: paymentDataUser?.city,
            email: paymentDataUser?.email,
            fullName: paymentDataUser?.fullName,
            phoneNumber: paymentDataUser?.phoneNumber,
            cardNumber: paymentDataUser?.cardNumber,
            cardExpiration: paymentDataUser?.cardExpiration,
            cvv: paymentDataUser?.cvv,
            pay: paymentDataUser?.pay,
            date: paymentDataUser?.date,
            Processing: true,
          };
        } else {
          return res;
        }
      });

      console.log(pro);

      updateDoc(ref, { MyOrders: pro });
    });

    this._ShowproductforUserService.id = id;
    this._ShowproductforUserService.showproductforUser(id);
    this._ShowproductforUserService.showDataUserAndLocation(id);
  }
}
