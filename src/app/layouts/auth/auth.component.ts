import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../components/auth-navbar/auth-navbar.component";
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from '../../environment/route-animations';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthNavbarComponent, AuthFooterComponent,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  animations: [routeAnimations],

})
export class AuthComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
