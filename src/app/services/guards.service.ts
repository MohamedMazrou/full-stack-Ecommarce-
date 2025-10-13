import { Injectable, inject, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { BlobOptions } from 'buffer';
import { RegisterComponent } from '../pages/register/register.component';



@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private router : Router,) { }
// can Activate
canActive():boolean{
   if(localStorage.getItem('token') != null) {
   

  return true
}else {
  this.router.navigate(['login'])
  return false
}
}

  // canDeActivate
  GuardnotLeftRegister(Component: RegisterComponent): boolean {
    if (!Component.DataRegisterUser.pristine && Component.DataRegisterUser.valid ) {
      return window.confirm('will lose your data')

    }

    else  {
    return true
    }
  }
 

  canActiveDash(): boolean {
    if (localStorage.getItem('admin_token') != null) {
      return true
    } else {
      this.router.navigate(['dash'])
      return false
    }
  }
}