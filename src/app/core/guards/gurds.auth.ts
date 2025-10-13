import {  GuardsService } from './../../services/guards.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

// ده من نوع هل ينع اعدي بيرجع يا ترو يا فولس gurds 
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

const GuardsS = inject(GuardsService)

return GuardsS.canActive()


};
