import { ListBlockedService } from './../../services/list-blocked.service';
import { NumberOfUsersService } from './../../services/number-of-users.service';
import { Component, OnInit } from '@angular/core';
import { AuthNavbarComponent } from "../../components/auth-navbar/auth-navbar.component";
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { regexEmail } from '../../core/regex/regex';
import { NgClass, NgIf } from '@angular/common';
import { IsLoadingService } from '../../services/is-loading.service'
import { IdataUsers, IlogIn, } from '../../core/Interfaces/http';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { Router, RouterLink } from '@angular/router';
import { NameEmailService } from '../../services/name-email.service';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthErrorCodes, FacebookAuthProvider } from '@angular/fire/auth';
import { AddToCartService } from '../../services/add-to-cart.service';
import { DataUsersService } from '../../services/data-users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _ListBlockedService: ListBlockedService, private _DataUsersService: DataUsersService, private _AddToCartService: AddToCartService, private _auth: Auth, private _FormBuilder: FormBuilder, public IsloadingServices: IsLoadingService, private router: Router, private _nameEmail: NameEmailService, private _NumberOfUsersService: NumberOfUsersService) { }


  // varibles control
  notification_error: boolean = false
  showmassege: boolean = false
  text_error: string = ''
  date: Date = new Date()



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }





  //  validation form logIn 


  DataLogin: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.pattern(regexEmail)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  // ======================================================

  getEmail() {
    return this.DataLogin.get('email')
  }
  getPassword() {
    return this.DataLogin.get('password')
  }

  // =====================================================
  // get data form login
  getData(formLogIn: FormGroup): void {
    if (formLogIn.invalid) {
      formLogIn.markAllAsTouched()
    }
    else if (formLogIn.valid) {

      console.log(formLogIn.value)
      this.logInData(formLogIn.value)
      this.IsloadingServices.setStatus(true, true)
      // formLogIn.reset()

    }
  }



  // post data for api
  logInData(data: IlogIn): void {


    signInWithEmailAndPassword(this._auth, data.email, data.password).then((res: any) => {



      this._ListBlockedService.getListBlock().then((blockUser) => {

        this.IsloadingServices.setStatus(false, false)
        this.notification_error = true
        this.text_error = 'Email or password is incorrect';
        setTimeout((): void => {
          this.notification_error = false
          this.showmassege = false
        }, 4000)

        const exite = blockUser.some((user: string) => user == res.user.uid)


        if (data.email != "admin@exmple.com" && !exite) {
          this.notification_error = false

          this._nameEmail.SetNameAndEmail(res.user.email)

          this.IsloadingServices.setStatus(false, true)

          const token = res._tokenResponse.idToken
          const id = res.user.uid
          localStorage.setItem('token', token)
          localStorage.setItem('id', id)
          this.router.navigate(['/user'])
          this._AddToCartService.creatCart()
          this._NumberOfUsersService.addNumerofUsers(res.user.uid)

        }

        else if (exite) {
          this.showmassege = true

          this.router.navigate(["/login"])
          localStorage.removeItem("token")
          localStorage.removeItem("name")
          localStorage.removeItem("email")
          localStorage.removeItem("id")
          localStorage.removeItem("image")

        }






      })






    }).catch((err) => {
      this.notification_error = true
      this.IsloadingServices.setStatus(false, true)

      if (err.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        this.text_error = 'Email or password is incorrect';
      } else if (err.code === AuthErrorCodes.USER_DELETED) {
        this.text_error = 'This user does not exist';
      } else {
        this.text_error = 'Something went wrong';

      }

      setTimeout((): void => {
        this.notification_error = false
      }, 4000)

    })
  }

  // sign in with google
  onSigninWithGoogle(): void {

    const google = new GoogleAuthProvider();
    signInWithPopup(this._auth, google).then((res: any) => {

      this._ListBlockedService.getListBlock().then((blockUser) => {
        const isExite = blockUser.some((ele: string) => res.user.uid == ele)

        if (!isExite) {
          this._nameEmail.SetNameAndEmail(res.user.email, res.user.photoURL)

          const token = res._tokenResponse.idToken
          const id = res.user.uid
           console.log(res)
          localStorage.setItem('token', token)
          localStorage.setItem('id', id)


          this._AddToCartService.creatCart()


          this.router.navigate(['/user'])

          this._NumberOfUsersService.addNumerofUsers(res.user.uid)


          const usersData: IdataUsers = {
            id: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            // date: `${this.date.getMonth() + 1}/${this.date.getDay()}/${this.date.getFullYear()}`,
            phoneNumber: res.user.phoneNumber,
            status: true,
            image: res.user.photoURL
          }

          this._DataUsersService.addDataUsers(usersData)
        }

        else if (isExite) {
          this.showmassege = true
          this.router.navigate(["/login"])
          localStorage.removeItem("token")
          localStorage.removeItem("name")
          localStorage.removeItem("email")
          localStorage.removeItem("id")
          localStorage.removeItem("image")
          setTimeout((): void => {
            this.showmassege = false
          }, 4000)

        }

      })
    }).catch((err) => {

      this.text_error = 'Something went wrong';

    })

  }




  // sign in with facebook

  onSigninWithfacebook(): void {
    const facebook = new FacebookAuthProvider();

    facebook.addScope('public_profile');
    facebook.addScope('email');

    signInWithPopup(this._auth, facebook).then((res: any) => {
      this._ListBlockedService.getListBlock().then((blockUser) => {
        const isExite = blockUser.some((ele: string) => res.user.uid == ele)

        if (!isExite) {
          this._nameEmail.SetNameAndEmail(res.user.displayName, res.user.photoURL)

          const token = res._tokenResponse.idToken
          const id = res.user.uid

          console.log(res)


          localStorage.setItem('token', token)
          localStorage.setItem('id', id)


          this._AddToCartService.creatCart()


          this.router.navigate(['/user'])
          this._NumberOfUsersService.addNumerofUsers(res.user.uid)

          const usersData: IdataUsers = {
            id: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            // date: `${this.date.getMonth() + 1}/${this.date.getDay()}/${this.date.getFullYear()}`,
            phoneNumber: res.user.phoneNumber,
            status: true,
            image: res.user.photoURL

          }
          this._DataUsersService.addDataUsers(usersData)
        }

        else if (isExite) {
          this.showmassege = true
          this.router.navigate(["/login"])
          localStorage.removeItem("token")
          localStorage.removeItem("name")
          localStorage.removeItem("email")
          localStorage.removeItem("id")
          localStorage.removeItem("image")
          setTimeout((): void => {
            this.showmassege = false
          }, 4000)

        }

      })

    })

      .catch((err) => {

        this.text_error = 'Something went wrong';

      })

  }


}
