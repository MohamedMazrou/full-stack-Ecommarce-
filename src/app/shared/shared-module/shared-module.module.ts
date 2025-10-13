
import { AuthFooterComponent } from "../../components/auth-footer/auth-footer.component";
import { AuthNavbarComponent } from "../../components/auth-navbar/auth-navbar.component";

import { NgModule } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule, NgClass, NgIf, AuthFooterComponent, AuthNavbarComponent
  ],
  exports: [ReactiveFormsModule, NgClass, NgIf, AuthFooterComponent, AuthNavbarComponent]
})
export class SharedModuleModule { }
