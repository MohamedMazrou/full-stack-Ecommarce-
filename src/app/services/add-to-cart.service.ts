
import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';

import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { IProduct } from '../core/Interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor(private firestore: Firestore) { }

  countOFCart !: number;
  alertAddCart: boolean = false


  // userID!: any ;

  getID(): string {
    return localStorage.getItem("id") || ""
  }

  async creatCart(): Promise<void> {
    const openDoc = doc(this.firestore, 'Cart', this.getID())
    const snapshot = await getDoc(openDoc)

    if (!snapshot.exists()) {
      await setDoc(openDoc, { products: [] });
      console.log(this.getID());
    } else {
      console.log(this.getID());
    }
    this.getFRomCart()
  }


  async addProductToCart(product: any):Promise<void> {

    await updateDoc(doc(this.firestore, 'Cart', this.getID()), { products: arrayUnion(product) },)

    // uptade count card when add product
    product.CardStatus = true
console.log(product)
    // product.basePrice = product.price

    this.getFRomCart().then((res:any):void => {

      this.countOFCart = res.length
      this.alertAddCart = true
      setTimeout((): void => {
        this.alertAddCart = false

      }, 2000)
    }  
    )
  }

async deleteFromCarts(productID:any):Promise<void>{

  const docData = (await getDoc(doc(this.firestore, 'Cart', this.getID())))
  

  const updatedProducts = docData.data()?.['products'].filter((ele: any) => ele.id !== productID);

   
  await updateDoc(doc(this.firestore, "Cart", this.getID()),{products:updatedProducts})

  this.getFRomCart().then((res: any): void => {

    this.countOFCart = res.length

  }
  )
}



  async getFRomCart(): Promise<string[]> {
    const docData = (await getDoc(doc(this.firestore, 'Cart', this.getID())))
    return docData.data()?.['products']

  }

  TopScroll(): void {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

}
