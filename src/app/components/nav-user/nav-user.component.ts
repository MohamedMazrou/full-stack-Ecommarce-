import { ShowOvarLayService } from './../../services/show-ovar-lay.service';
import { AddToCartService } from './../../services/add-to-cart.service';
import { LoginComponent } from './../../pages/login/login.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AfterViewChecked, Component, DoCheck, ElementRef, OnInit, ViewChild, OnChanges } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { IdataUsers, IlogIn } from '../../core/Interfaces/http';
import { NameEmailService } from '../../services/name-email.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchProductsPipe } from '../../pipe/search-products.pipe';
import { FormsModule } from '@angular/forms';
import { DataUsersService } from '../../services/data-users.service';
@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive, SearchProductsPipe,FormsModule],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit {



  constructor(private _DataUsersService:DataUsersService,public NameEmailService: NameEmailService, private router: Router, public _AddToCartService: AddToCartService,public _ShowOvarLayService:ShowOvarLayService) { 
  

// this.emptyInputSearch()
    
  }
  
  ArrNav: string[] = ['Home', 'products', 'categories',]


   

  VariableShowMenuUser: boolean = false
  VariableShowListMobile: boolean = false
  showMenuUser() {
    this.VariableShowMenuUser = !this.VariableShowMenuUser
    this.VariableShowListMobile = false
    this._ShowOvarLayService.show_OvarLay = false
  }
  showlistMobile() {
    this.VariableShowListMobile = !this.VariableShowListMobile
    this.VariableShowMenuUser = false
    this._ShowOvarLayService.show_OvarLay = false
    
  }

 

  ngOnInit(): void {
    this.NameEmailService.getNameEmailFromLocalstorge()

  this._AddToCartService.getFRomCart().then((res) => { this._AddToCartService.countOFCart = res.length  })
    

  

  }




  logout(): void {
 
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("id")
    localStorage.removeItem("image")

    this.router.navigate(["/login"])

  }

  
  
}
