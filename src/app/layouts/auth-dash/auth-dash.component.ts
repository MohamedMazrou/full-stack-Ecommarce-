import { Component } from '@angular/core';
import { NavDashbordComponent } from "../../components/auth-dashbord/nav-dashbord.component";
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { RouterOutlet } from '@angular/router';
import { LogInDashComponent } from "../../pages/log-in-dash/log-in-dash.component";
// import { RouterOutlet } from "../../../../node_modules/@angular/router/index";

@Component({
  selector: 'app-auth-dash',
  standalone: true,
  imports: [NavDashbordComponent, AuthFooterComponent, LogInDashComponent],
  templateUrl: './auth-dash.component.html',
  styleUrl: './auth-dash.component.css'
})
export class AuthDashComponent {

}
