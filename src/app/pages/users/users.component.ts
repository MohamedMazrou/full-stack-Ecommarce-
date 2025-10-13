import { ListBlockedService } from './../../services/list-blocked.service';
import { IdataUsers } from '../../core/Interfaces/http';
import { DataUsersService } from './../../services/data-users.service';
import { NumberOfUsersService } from './../../services/number-of-users.service';
import { Component, OnChanges } from '@angular/core';
import { NgClass } from "../../../../node_modules/@angular/common/index";
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { Firestore, doc, setDoc, updateDoc, arrayUnion, getDoc, arrayRemove, DocumentSnapshot, DocumentData, DocumentReference, addDoc, } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DashSearchUsersPipe } from '../../pipe/dash-search-users.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModuleModule, DashSearchUsersPipe,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private _ListBlockedService:ListBlockedService ,public _NumberOfUsersService: NumberOfUsersService, public _DataUsersService: DataUsersService, private _Firestore: Firestore,private router:Router) { }

NumberOfusers !: number;
NumberNewusers !: number;
arrDataUsers !:IdataUsers[] 
valSearchInput :string = ""
ngOnInit(): void {
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
     this.getNumberofUsers()
  this.getNumberNewUsers()
  this.getDataUsers()
  this._NumberOfUsersService.resetArry()
}

// Number of users
getNumberofUsers():void{
  this._NumberOfUsersService.getNumberOfUsers().then((res)=>{

    this.NumberOfusers =  res.length
  })
}
  // Number New users
getNumberNewUsers():void{
  this._NumberOfUsersService.getNumberNewUsers().then((res)=>{

    this.NumberNewusers =  res.length
  })
}

getDataUsers():void{
  this._DataUsersService.getDataUsers().then((res)=>{
    this.arrDataUsers = res
    console.log(this.arrDataUsers)
  })
}


// not active
   bloked(id?: string ) {
    this._DataUsersService.getDataUsers().then(data => {
      this.arrDataUsers = data.map((ele: IdataUsers): any => {
        if (id == ele.id) {
          
          this._ListBlockedService.blockList(id)
          return { ...ele, status: false }
        }
        else { return  ele}
        
     
      })

      const ref: DocumentReference<DocumentData, DocumentData> = doc(this._Firestore, "dataUsers", "dataUsers")

        updateDoc(ref, { dataUsers: this.arrDataUsers });

//  this.arrDataUsers = data
      
    })
 
  }




  //  active user
   Unblock(id?: string ) {
    this._DataUsersService.getDataUsers().then(data => {
      this.arrDataUsers = data.map((ele: IdataUsers): any => {
        if (id == ele.id) {
          this._ListBlockedService.removeFromblockList(id)
          return { ...ele, status: true }
        }
        else { return ele  }
      })
      const ref: DocumentReference<DocumentData, DocumentData> = doc(this._Firestore, "dataUsers", "dataUsers")

      updateDoc(ref, { dataUsers: this.arrDataUsers });

      // this.arrDataUsers = data


    })
  }
}
