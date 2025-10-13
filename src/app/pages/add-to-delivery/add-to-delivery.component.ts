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
  docData,
} from '@angular/fire/firestore';
import { paymentDataUser } from '../../core/Interfaces/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchDeliveryPipe } from '../../pipe/search-delivery.pipe';

@Component({
  selector: 'app-add-to-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchDeliveryPipe],
  templateUrl: './add-to-delivery.component.html',
  styleUrl: './add-to-delivery.component.css',
})
export class AddToDeliveryComponent implements OnInit {
  constructor(private _Firestore: Firestore) {}
  arrDataDelivery!: paymentDataUser[];
  inputSearchProduct: string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDataDelivery();
  }

  getDataDelivery(): void {
    const ref = doc(this._Firestore, 'Delivery', 'Delivery');
    docData(ref).subscribe((data: any) => {
      console.log(data);
      this.arrDataDelivery = data.Delivery;
    });
  }
}
