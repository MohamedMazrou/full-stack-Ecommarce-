import { AddToCartService } from './../../services/add-to-cart.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowproductforUserService } from '../../services/showproductfor-user.service';
import { paymentDataUser } from '../../core/Interfaces/http';
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
  docData,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HiddenNumberCardPipe } from '../../pipe/hidden-number-card.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-order-progress',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HiddenNumberCardPipe,
    NgxPaginationModule,

  ],
  templateUrl: './order-progress.component.html',
  styleUrl: './order-progress.component.css',
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
export class OrderProgressComponent {
  constructor(
    private _Firestore: Firestore,
    public _AddToCartService: AddToCartService
  ) {}

  p: number = 1;
  itemsPerPage: number = 3;

  MyOrders!: paymentDataUser[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the cla
    this._AddToCartService.TopScroll();
    this.showData_my_order();
    // this.MyOrders.reverse()
  }
  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   this.showData_my_order()
  // }

  id: any = localStorage.getItem('id');

  async showData_my_order() {
    const ref = doc(this._Firestore, 'Myorders', this.id);

    await getDoc(ref).then((data) => {
      this.MyOrders = data.data()?.['MyOrders'];
    });
  }

  received(order: paymentDataUser) {
    const deliver = doc(this._Firestore, 'Delivery', 'Delivery');
    getDoc(deliver).then((res) => {
      const checkOrder = res
        .data()
        ?.['Delivery'].find(
          (ele: paymentDataUser) => ele.ID_order == order.ID_order
        );
      // هضيفها في ارااي تم التسليم
      updateDoc(doc(this._Firestore, 'received', 'received'), {
        received: arrayUnion(checkOrder),
      });

      // همسحها في ارااي الشحن
      updateDoc(doc(this._Firestore, 'Delivery', 'Delivery'), {
        Delivery: arrayRemove(checkOrder),
      });
    });

    // هروح اشوف في ارااي الاوردر عن نفس الاوردر ده وهعمله تم التسليم عشان يخفي البةبب بتاعت التسليم
    const refOrder = doc(this._Firestore, 'Myorders', order.id);

    getDoc(refOrder).then((res) => {
      const pro = res.data()?.['MyOrders'].map((res: paymentDataUser) => {
        if (order.ID_order == res.ID_order) {
          return {
            ...res,

            id: order.id,
            ID_order: order?.ID_order,
            image: order.image,
            street: order.street,
            city: order.city,
            email: order.email,
            fullName: order.fullName,
            phoneNumber: order.phoneNumber,
            cardNumber: order.cardNumber,
            cardExpiration: order.cardExpiration,
            cvv: order.cvv,
            pay: order.pay,
            date: order.date,
            Processing: true,
            Shipped: true,
            received: true,
          };
        } else {
          return res;
        }
      });

      console.log(pro);

      updateDoc(refOrder, { MyOrders: pro });
      this.MyOrders = pro;
    });
  }

  Undelivered(order: paymentDataUser) {
    const deliver = doc(this._Firestore, 'Delivery', 'Delivery');

    getDoc(deliver).then((res) => {
      const checkOrder = res
        .data()
        ?.['Delivery'].find(
          (ele: paymentDataUser) => ele.ID_order == order.ID_order
        );
      // هضيفها في ارااي تم الرفض
      updateDoc(doc(this._Firestore, 'Undelivered', 'Undelivered'), {
        Undelivered: arrayUnion(checkOrder),
      });

      // همسحها في ارااي الشحن
      updateDoc(doc(this._Firestore, 'Delivery', 'Delivery'), {
        Delivery: arrayRemove(checkOrder),
      });
    });

    // هروح اشوف في ارااي الاوردر عن نفس الاوردر ده وهعمله تم الرفض عشان يخفي البةبب بتاعت التسليم
    const refOrder = doc(this._Firestore, 'Myorders', order.id);

    getDoc(refOrder).then((res) => {
      const pro = res.data()?.['MyOrders'].map((res: paymentDataUser) => {
        if (order.ID_order == res.ID_order) {
          return {
            ...res,

            id: order.id,
            ID_order: order?.ID_order,
            image: order.image,
            street: order.street,
            city: order.city,
            email: order.email,
            fullName: order.fullName,
            phoneNumber: order.phoneNumber,
            cardNumber: order.cardNumber,
            cardExpiration: order.cardExpiration,
            cvv: order.cvv,
            pay: order.pay,
            date: order.date,
            Processing: true,
            Shipped: true,
            received: false,
            Undelivered: true,
          };
        } else {
          return res;
        }
      });

      console.log(pro);

      updateDoc(refOrder, { MyOrders: pro });

      this.MyOrders = pro;
    });
  }

  deleteOrder(index:number,order:paymentDataUser):void{
   const refOrder = doc(this._Firestore, 'Myorders', order.id);
   updateDoc(refOrder, { MyOrders : arrayRemove(order) });
   this.MyOrders.splice(index,1)
  

  }
}


