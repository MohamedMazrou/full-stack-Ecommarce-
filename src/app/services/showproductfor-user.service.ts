import { idToken } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
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
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowproductforUserService {
  constructor(private _Firestore: Firestore) {}
  countOrderSubject = new BehaviorSubject<number>(0);
  countUndeliveredSubject = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDataPaymetUser();
    this.getDataUndelivered();
  }

  id!: string;
  async showproductforUser(id: string) {
    const res = await getDoc(doc(this._Firestore, 'productForUser', id));
    return res.data()?.['products'];
  }
  async showDataUserAndLocation(id: string) {
    const res = await getDoc(doc(this._Firestore, 'Payment', id));
    return res.data()?.['payment'];
  }

  getDataPaymetUser() {
    const ref = doc(this._Firestore, 'PaymentAllpro', 'PaymentAllpro');

    docData(ref).subscribe((res) => {
      this.countOrderSubject.next(res?.['PaymentAllpro'].length);
    });
  }

  getDataUndelivered() {
    const ref = doc(this._Firestore, 'Undelivered', 'Undelivered');

    docData(ref).subscribe((res) => {
      this.countUndeliveredSubject.next(res?.['Undelivered'].length);
    });
  }
}
