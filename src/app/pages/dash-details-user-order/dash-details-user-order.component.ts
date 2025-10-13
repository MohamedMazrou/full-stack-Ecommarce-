import { ShowproductforUserService } from './../../services/showproductfor-user.service';
import { ShowOvarLayService } from './../../services/show-ovar-lay.service';
import { Component } from '@angular/core';
import { IProduct, paymentDataUser } from '../../core/Interfaces/http';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { pro_Titel_Cut_Pipe } from '../../pipe/cut-titel-pro.pipe';
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

@Component({
  selector: 'app-dash-details-user-order',
  standalone: true,
  imports: [NgClass, CommonModule, pro_Titel_Cut_Pipe],
  templateUrl: './dash-details-user-order.component.html',
  styleUrl: './dash-details-user-order.component.css',
})
export class DashDetailsUserOrderComponent {
  constructor(
    private _ShowproductforUserService: ShowproductforUserService,
    private router: Router,
    private _Firestore: Firestore,
  ) {}
  arrProductforUser!: IProduct[];
  arrDataUserAndLocation!: paymentDataUser[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showproduct();
    this.showDataUserAndLocation();

    if (!this._ShowproductforUserService.id) {
      this.router.navigate(['/dashboard/OrderManagement']);
    } else {
      false;
    }
  }

  showproduct(): void {
    this._ShowproductforUserService
      .showproductforUser(this._ShowproductforUserService.id)
      .then((res: any) => {
        this.arrProductforUser = res;
        console.log(this.arrProductforUser);
      });
  }

  showDataUserAndLocation(): void {
    this._ShowproductforUserService
      .showDataUserAndLocation(this._ShowproductforUserService.id)
      .then((res: any) => {
        this.arrDataUserAndLocation = res;
        console.log(this.arrDataUserAndLocation);
      });
  }

  addToDelivery(DataUserAndLocation: paymentDataUser): void {
    console.log(DataUserAndLocation);
    // add to delivery
    const deliveryRef = doc(this._Firestore, 'Delivery', 'Delivery');
    updateDoc(deliveryRef, { Delivery: arrayUnion(DataUserAndLocation) });
    // delete from PaymentAllpro
    const ref = doc(this._Firestore, 'PaymentAllpro', 'PaymentAllpro');
    updateDoc(ref, { PaymentAllpro: arrayRemove(DataUserAndLocation) });
    this.router.navigate(['/dashboard/OrderManagement']);

//الاوردر id بخلي الاوردر يتفعل فيه علامة تم الشحن لو لقي نفس 
  const refOrder = doc(this._Firestore, 'Myorders', DataUserAndLocation.id);

  getDoc(refOrder).then((res) => {
    const pro = res.data()?.['MyOrders'].map((res: paymentDataUser) => {
      if (localStorage.getItem('ID_order') == res.ID_order) {
        return {
          ...res,

          id: DataUserAndLocation?.id,
          ID_order: DataUserAndLocation?.ID_order,
          image: DataUserAndLocation?.image,
          street: DataUserAndLocation?.street,
          city: DataUserAndLocation?.city,
          email: DataUserAndLocation?.email,
          fullName: DataUserAndLocation?.fullName,
          phoneNumber: DataUserAndLocation?.phoneNumber,
          cardNumber: DataUserAndLocation?.cardNumber,
          cardExpiration: DataUserAndLocation?.cardExpiration,
          cvv: DataUserAndLocation?.cvv,
          pay: DataUserAndLocation?.pay,
          date: DataUserAndLocation?.date,
          Processing: true,
          Shipped : true,
        };
      } else {
        return res;
      }
    });

    console.log(pro);

    updateDoc(refOrder, { MyOrders: pro });
  });
  }
}
