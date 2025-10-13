import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, addDoc, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListBlockedService {

  constructor(private firestore: Firestore) { }
async  blockList(id: string) {


  const ref = doc(this.firestore, "ListBlock", "ListBlock")
  await setDoc(ref, { ListBlock: arrayUnion(id) }, { merge: true })
       
  }

async  removeFromblockList(id: string) {
  const ref = doc(this.firestore, "ListBlock", "ListBlock")
  await updateDoc(ref, { ListBlock: arrayRemove(id) }, )
       
  }

  async getListBlock(){
    const ref = doc(this.firestore, "ListBlock", "ListBlock")
    return (await getDoc(ref)).data()?.["ListBlock"]
  }
}
