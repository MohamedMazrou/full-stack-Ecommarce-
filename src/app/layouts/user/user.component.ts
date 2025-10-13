import { Component } from '@angular/core';
import { NavUserComponent } from "../../components/nav-user/nav-user.component";
import { FooterUserComponent } from "../../components/footer-user/footer-user.component";
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from '../../environment/route-animations';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavUserComponent, FooterUserComponent, RouterOutlet ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [routeAnimations],

})
export class UserComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
