import { BlobOptions } from "buffer";

export interface IlogIn{
    
    email:string,
    password:string,
   
}



export interface Iregister {
    name: string,
    email: string,
    phoneNumber: number,
    password: string,
    ConfirmPassword: string,
}

export interface IdataUsers {
    id:string
    name:string,
    email:string,
    // date:string,
    status:boolean,
    image:string,
    phoneNumber?:number
}

export interface IProduct {
    id: number;
    title: string;
    popular:boolean;
    price: number;
    description: string;
    image: string;
    category:string;
    brand: string;
    model: string;
    color: string,
    discount: number,
    onSale: boolean,
    CardStatus :boolean,
    Quantity:number,
    basePrice:number,
   

}

export interface paymentDataUser {
  id: string;
  ID_order: string;
  image: string;
  street: string;
  city: string;
  email: string;
  fullName:string ;
  phoneNumber: number;
  cardNumber: number | string;
  cardExpiration: string;
  cvv: number;
  pay: number;
  date: string;
  Processing: boolean;
  Shipped: boolean;
  Delivered: boolean;
  received: boolean;
  Undelivered:boolean
}

export interface IdateProfits{
    year:number,
    month:number,
    total:number,
}