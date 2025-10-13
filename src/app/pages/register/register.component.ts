import { DataUsersService } from './../../services/data-users.service';
import { NumberOfUsersService } from './../../services/number-of-users.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { Component } from '@angular/core';

import { IsLoadingService } from "../../services/is-loading.service"
import { AbstractControl, AbstractControlDirective, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import {  IdataUsers, Iregister } from '../../core/Interfaces/http'

import { regexEmail } from '../../core/regex/regex';
import { Route, RouterFeatures } from '@angular/router';
import { Router } from '@angular/router';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { NameEmailService } from '../../services/name-email.service';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, } from '@angular/fire/firestore';
import { UserInfo } from 'os';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})



export class RegisterComponent {

  constructor(private _DataUsersService:DataUsersService,private _NumberOfUsersService:NumberOfUsersService,private _AddToCartService:AddToCartService,private _auth: Auth, private _formBuilder: FormBuilder, public IsloadingServices: IsLoadingService, private router: Router, private _nameEmail: NameEmailService,private _Firestore:Firestore) { }


  // varibles control
  notification_Success: boolean = false
  notification_error: boolean = false

date : Date =  new Date()

  // check do Confirm Password aqual password 
  matchpass(form: AbstractControl): { [key: string]: boolean } | null {
    const password: number = form.get('password')?.value
    const Confirm_Password: number = form.get('Confirm_Password')?.value

    return Confirm_Password === password ? null : { ConfirmPassNotMatch: true }
  }
  // ======================================================
  //  validation form register 
  DataRegisterUser: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(regexEmail)],],
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10), , Validators.pattern(/[0-9]/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    Confirm_Password: ['', Validators.required],

  },

    { validators: this.matchpass },

  )

  // ======================================================

  getEmail() {
    return this.DataRegisterUser.get('email')
  }
  getName() {
    return this.DataRegisterUser.get('name')
  }
  getphoneNumber() {
    return this.DataRegisterUser.get('phoneNumber')
  }
  getPassword() {
    return this.DataRegisterUser.get('password')
  }
  getConfirmPassword() {
    return this.DataRegisterUser.get('Confirm_Password')
  }


  // =====================================================


  // get data form register
  getData(form: FormGroup): void {



    if (form.invalid) {
      form.markAllAsTouched()
    }
    else if (form.valid) {
     
      this.RegisterData(form.value,)
      this.IsloadingServices.setStatus(true,true)

    }
  }





  // post data for firebase
  RegisterData(data: Iregister): void {
    createUserWithEmailAndPassword(this._auth,data.email,data.password,).then((res:any) => {

      this.IsloadingServices.setStatus(false,true)
      console.log(res)
      this.notification_Success = true


      this._nameEmail.SetNameAndEmail(res.user.email, res.user.photoURL)
      const token :any= res._tokenResponse.idToken
      const id :any= res.user.uid

      localStorage.setItem('token', token)
      localStorage.setItem('id', id)
      this._AddToCartService.creatCart()

      setTimeout((): void => {
        this.notification_Success = false
        this.router.navigate(['/user'])
 

      }, 4000)

      this._NumberOfUsersService.NewUsers(res.user.uid)


      const usersData : IdataUsers = {
        id: res.user.uid,
       name:data.name,
       email:data.email,
      //  date:`${this.date.getMonth()+1}/${this.date.getDay()}/${this.date.getFullYear()}`,
      phoneNumber:data.phoneNumber,
       status:true,
       image:''
       
      }

    this._DataUsersService.addDataUsers(usersData)
    
    }).catch((err) => {
      this.notification_error = true
      this.IsloadingServices.setStatus(false,true)


      console.log(err)
      setTimeout((): void => {
        this.notification_error = false
      }, 4000)
    
    })
    // console.log(data)


  }




}
