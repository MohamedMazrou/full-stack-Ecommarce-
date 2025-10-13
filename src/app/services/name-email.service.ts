import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameEmailService {
  // public name: string | null = ''
  public email: string | null = ''

   imageEmail: string | null = ''




  SetNameAndEmail( email: string,imageSrc?:any): void {


    localStorage.setItem('image', imageSrc)
    localStorage.setItem('email', email)
    this.getNameEmailFromLocalstorge()
  }

  getNameEmailFromLocalstorge(): void {

    this.imageEmail = localStorage.getItem('image')
    this.email = localStorage.getItem('email')
   
    console.log(this.imageEmail)
  }

}
