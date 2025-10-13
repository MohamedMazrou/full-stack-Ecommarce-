import { Component } from '@angular/core';
import { NavAdminComponent } from "../../components/nav-admin/nav-admin.component";
import { NameEmailService } from '../../services/name-email.service';
import { Router } from 'express';
import { AddToCartService } from '../../services/add-to-cart.service';
import { ShowOvarLayService } from '../../services/show-ovar-lay.service';
import { NavDashbordComponent } from "../../components/auth-dashbord/nav-dashbord.component";
import { FooterUserComponent } from "../../components/footer-user/footer-user.component";
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavAdminComponent,
    NavDashbordComponent,
    FooterUserComponent,
    AuthFooterComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

}
