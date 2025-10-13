import { IlogIn } from './../../core/Interfaces/http';
import { Component } from '@angular/core';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexEmail } from '../../core/regex/regex';
import { IsLoadingService } from '../../services/is-loading.service';
import { Auth, signInWithEmailAndPassword, AuthErrorCodes } from '@angular/fire/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { routes } from '../../app.routes';
import { NameEmailService } from '../../services/name-email.service';


@Component({
  selector: 'app-log-in-dash',
  standalone: true,
  imports: [SharedModuleModule, RouterLink, RouterOutlet],
  templateUrl: './log-in-dash.component.html',
  styleUrl: './log-in-dash.component.css'
})
export class LogInDashComponent {

  constructor(private _FormBuilder: FormBuilder, public IsloadingServices: IsLoadingService,private _auth: Auth, private router: Router, private _nameEmail:NameEmailService){}
  // varibles control
  notification_error: boolean = false
  text_error: string = ''



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
  // get data form login dash 
  getData(formLogIn: FormGroup): void {
    if (formLogIn.invalid) {
      formLogIn.markAllAsTouched()
    }
    else if (formLogIn.valid) {
 this.logIn(formLogIn.value)
      console.log(formLogIn.value)
      this.IsloadingServices.setStatus(true, true)
      // formLogIn.reset()
    }

   

  }

  logIn(data: IlogIn): void {
    signInWithEmailAndPassword(this._auth, data.email, data.password).then((res: any) => {
      if (data.email == "admin@exmple.com"){
        // this._nameEmail.SetNameAndEmail(res.user.email)
        this.notification_error = false
        this.IsloadingServices.setStatus(false, true)
        const token = res._tokenResponse.idToken
        localStorage.setItem('admin_token', token)
        this.router.navigate(["dashboard"])
        


      }
       else if (data.email != "admin@exmple.com"){
       
        this.IsloadingServices.setStatus(false, false)
        this.notification_error = true
        this.text_error = 'Email or password is incorrect';
        console.log(" your are not admin")
        
        setTimeout((): void => {
          this.notification_error = false
        }, 4000)


      }
    }).catch((err)=>{
      if (err.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        this.notification_error = true
        this.text_error = 'Email or password is incorrect';
        this.IsloadingServices.setStatus(false, false)

      }

     

      // this.text_error = 'Something went wrong';
     
      setTimeout((): void => {
        this.notification_error = false
      }, 4000)

    })
  }
}
