import { length } from './../../../../node_modules/zrender/src/core/vector';
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
} from '@angular/fire/firestore';
import { paymentDataUser } from '../../core/Interfaces/http';
import { CommonModule } from '@angular/common';
import { HiddenNumberCardPipe } from '../../pipe/hidden-number-card.pipe';
import { FormsModule } from '@angular/forms';
import { SearchReceivedPipe } from '../../pipe/search-received.pipe';
import { IdateProfits } from '../../core/Interfaces/http';
import { merge } from 'rxjs';
// import { console } from 'inspector';

@Component({
  selector: 'app-dash-received',
  standalone: true,
  imports: [
    CommonModule,
    HiddenNumberCardPipe,
    FormsModule,
    SearchReceivedPipe,
  ],
  templateUrl: './dash-received.component.html',
  styleUrl: './dash-received.component.css',
})
export class DashReceivedComponent {
  constructor(private _Firestore: Firestore) {}
  arrReceived!: paymentDataUser[];
  inputSearchProduct: string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
  }

  getData(): void {
    const received: DocumentReference<DocumentData, DocumentData> = doc(
      this._Firestore,
      'received',
      'received'
    );
    getDoc(received).then(async (res) => {
      this.arrReceived = await res.data()?.['received'];

      // ============================================
      const total = this.arrReceived.reduce((acc, res) => {
        return acc + Math.round(res.pay);
      }, 0);
      const date: Date = new Date();

      const objDate: IdateProfits = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        total: total,
      };

      const profits: DocumentReference<DocumentData, DocumentData> = doc(
        this._Firestore,
        'profits',
        'profits'
      );

      const currentDay: number = date.getDate();
      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      if (currentDay === lastDay) {
        await updateDoc(doc(this._Firestore, 'received', 'received'), {
          received: [],
        });

        await updateDoc(profits, { profits: arrayUnion(objDate) });
      }

      console.log(total);
      // setDoc(profits, { profits:[objDate]  });
      const snap = await getDoc(profits);
      const dataprofits: IdateProfits[] = snap.data()?.['profits'];

      const check = dataprofits.map((ele: IdateProfits) => {
        console.log( ele.month + 1)
        console.log( date.getMonth() + 1 )
        if (
          ele.month + 1 == date.getMonth() + 1 &&
          ele.year == date.getFullYear()
        ) {
          console.log("true")
          return { ...ele, year: ele.year, month: ele.month, total: total };
        } else {
           console.log("false")
          return ele;
        }
      });

      updateDoc(profits, { profits: check });
    });
    
  }
}
