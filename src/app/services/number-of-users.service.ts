import { AddToCartService } from './add-to-cart.service';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NumberOfUsersService {

  constructor(private Firestore: Firestore,) { }
  lastDay!: number;
  Variablenumberofusers!: number;
  VariablenumberNewusers!: number;

  async addNumerofUsers(idUser: string): Promise<any> {


    console.log(idUser)
    const nameCollectionOrdocument: DocumentReference<DocumentData, DocumentData> = doc(this.Firestore, "NumberOfusers", "numberOfusers",)
    await updateDoc(nameCollectionOrdocument, { numberOfusers: arrayUnion(idUser) })
  }

  async getNumberOfUsers() {


    const data: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(doc(this.Firestore, "NumberOfusers", "numberOfusers"))

    return data.data()?.["numberOfusers"]


  }


  //=============================================================


  // number New users
  async NewUsers(idNewUser: string): Promise<any> {


    const nameCollectionOrdocument: DocumentReference<DocumentData> = doc(this.Firestore, "NumberNewUsers", "NumberNewUsers",)

    await updateDoc(nameCollectionOrdocument, { NumberNewUsers: arrayUnion(idNewUser) })


  }


  async getNumberNewUsers(): Promise<any> {

    // this.resetArry()
    const data: DocumentSnapshot<DocumentData> = await getDoc(doc(this.Firestore, "NumberNewUsers", "NumberNewUsers"))

    return data.data()?.["NumberNewUsers"]

  }




  async resetArry(): Promise<any> {
    const date: Date = new Date()

    this.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const currentDay: number = date.getDate()
    // console.log(this.lastDay)

    if (currentDay === this.lastDay) {
      await updateDoc(doc(this.Firestore, "NumberNewUsers", "NumberNewUsers",), { NumberNewUsers: [] })

    }
  }

}
