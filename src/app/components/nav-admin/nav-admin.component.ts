import { ShowproductforUserService } from './../../services/showproductfor-user.service';
import { Component } from '@angular/core';
import { NameEmailService } from '../../services/name-email.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AddToCartService } from '../../services/add-to-cart.service';
import { ShowOvarLayService } from '../../services/show-ovar-lay.service';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { SearchProductsPipe } from '../../pipe/search-products.pipe';


import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  DocumentSnapshot,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [
    SharedModuleModule,
    RouterLink,
    FormsModule,
    SearchProductsPipe,
    RouterLinkActive,
    FormsModule,
    NgClass,
  ],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.css',
})
export class NavAdminComponent {
  constructor(
    public NameEmailService: NameEmailService,
    private router: Router,
    public _AddToCartService: AddToCartService,
    public _ShowproductforUserService: ShowproductforUserService,
    private _Firestore: Firestore
  ) {}
  countOrder!: number;
  countUndelivered!: number;

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //       this._ShowproductforUserService.getDataPaymetUser();

  //    this._ShowproductforUserService.countOrderSubject.subscribe(
  //      (length) => (this.countOrder = length)
  //    );

  // }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ShowproductforUserService.getDataPaymetUser();
    this._ShowproductforUserService.getDataUndelivered();

    this._ShowproductforUserService.countOrderSubject.subscribe(
      (length) => (this.countOrder = length)
    );
    this._ShowproductforUserService.countUndeliveredSubject.subscribe(
      (length) => (this.countUndelivered = length)
    );
  }

  showsideBar: boolean = false;

  // disableScroll(): void {
  //   document.body.style.overflow = 'hidden';
  // }

  // enableScroll(): void {
  //   document.body.style.overflow = 'auto';
  // }

  showSidebar(): void {
    this.showsideBar = !this.showsideBar;
    if (this.showsideBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  logout(): void {
    localStorage.removeItem('admin_token');

    this.router.navigate(['dash']);
  }
}
