import { ShowproductforUserService } from './../../services/showproductfor-user.service';
import { IsLoadingService } from './../../services/is-loading.service';
import { Component } from '@angular/core';
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
  deleteDoc,
} from '@angular/fire/firestore';
import { paymentDataUser } from '../../core/Interfaces/http';
import { CommonModule } from '@angular/common';
import { HiddenNumberCardPipe } from '../../pipe/hidden-number-card.pipe';
import { FormsModule } from '@angular/forms';
import { SearchUndeliveredPipe } from '../../pipe/search-undelivered.pipe';

@Component({
  selector: 'app-dash-undelivered',
  standalone: true,
  imports: [CommonModule, HiddenNumberCardPipe,FormsModule,SearchUndeliveredPipe],
  templateUrl: './dash-undelivered.component.html',
  styleUrl: './dash-undelivered.component.css',
})
export class DashUndeliveredComponent {
  constructor(private _Firestore: Firestore,public IsLoadingService:IsLoadingService,) {}
  arrUndelivered!: paymentDataUser[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();

  }

  getData(): void {
    const Undelivered: DocumentReference<DocumentData, DocumentData> = doc(
      this._Firestore,
      'Undelivered',
      'Undelivered'
    );
    getDoc(Undelivered).then(async (res) => {
      console.log(res.data()?.['Undelivered']);
      this.arrUndelivered = await res.data()?.['Undelivered'];
    });
  }

  addToDelivere(Undelivered:paymentDataUser): void {
    this.IsLoadingService.IsLoading = true
    const ref = doc(this._Firestore, 'Myorders', Undelivered.id);

       getDoc(ref).then((res) => {
        const pro = res.data()?.['MyOrders'].map((res: paymentDataUser) => {
          if (Undelivered.ID_order == res.ID_order) {
            return {
              ...res,

              id: Undelivered?.id,
              ID_order: Undelivered?.ID_order,
              image: Undelivered?.image,
              street: Undelivered?.street,
              city: Undelivered?.city,
              email: Undelivered?.email,
              fullName: Undelivered?.fullName ,
              phoneNumber: Undelivered?.phoneNumber,
              cardNumber: Undelivered?.cardNumber,
              cardExpiration: Undelivered?.cardExpiration,
              cvv: Undelivered?.cvv,
              pay: Undelivered?.pay,
              date: Undelivered?.date,
              Processing: true,
              Shipped: true,
              Delivered: true,
              received: false,
              Undelivered:false
            };
          } else {
            return res;
          }
        })

        updateDoc(ref, { MyOrders :pro});

    const deliveryRef = doc(this._Firestore, 'Delivery', 'Delivery');
    updateDoc(deliveryRef, { Delivery: arrayUnion(Undelivered) });

    const UndeliveredRef = doc(this._Firestore, 'Undelivered', 'Undelivered');
    updateDoc(UndeliveredRef, { Undelivered: arrayRemove(Undelivered) }). then(async (ele:any)=> {
          getDoc(UndeliveredRef).then((snapshot) => {
            this.IsLoadingService.IsLoading = false
            this.arrUndelivered = snapshot.data()?.['Undelivered'] || [];
          });
    });
            
      
      
      })

        
  }

  showDeleteConfirm: boolean = false;
   inputSearchProduct: string = '';

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

    DeleteOrder(order:paymentDataUser):void {
        this.hiddenDivDelete();
    const Undelivered = doc(this._Firestore, 'Undelivered', 'Undelivered');
    updateDoc(Undelivered,{Undelivered:arrayRemove(order)}).then(async (ele:any)=> {

         getDoc(Undelivered).then((snapshot) => {
           this.arrUndelivered = snapshot.data()?.['Undelivered'] || [];
         });
    } )


    }
}
