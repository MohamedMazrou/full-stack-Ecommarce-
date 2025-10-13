import { inject, Component } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';
import { GuardsService } from '../../services/guards.service';


export function notLeftRegister(component: RegisterComponent): CanDeactivateFn<RegisterComponent> | boolean{ 

const inj = inject(GuardsService)
  return inj.GuardnotLeftRegister(component)
}