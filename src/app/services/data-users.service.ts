import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, addDoc, } from '@angular/fire/firestore';
import { IdataUsers } from '../core/Interfaces/http';


@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  constructor(private _Firestore:Firestore,) { }
  // arrDataUsers !: IdataUsers[] 

 async  addDataUsers(usersData: IdataUsers) {
    const ref: DocumentReference<DocumentData, DocumentData> = doc(this._Firestore, "dataUsers", "dataUsers")
   await setDoc(ref, { dataUsers:arrayUnion(usersData)  }, { merge: true } )
  }
 async  getDataUsers() {
 
   const data: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(doc(this._Firestore, "dataUsers", "dataUsers")) 
return  data.data()?.['dataUsers']
  }


//  sandDataUsers(){
//   this.getDataUsers().then((data)=> this.arrDataUsers = data)
//   return this.arrDataUsers
//  }


}
