import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { GuardsService } from '../../services/guards.service';


export const logInDashbordGuard: CanActivateFn = (route, state) => {
 
 return inject(GuardsService).canActiveDash()
};
