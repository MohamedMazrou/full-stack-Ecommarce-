import { Pipe, PipeTransform } from '@angular/core';
import { paymentDataUser } from '../core/Interfaces/http';

@Pipe({
  name: 'searchMangementOrder',
  standalone: true
})
export class SearchMangementOrderPipe implements PipeTransform {

  transform(arr: paymentDataUser[] , value:string):paymentDataUser[] {
 return  arr.filter((ele:paymentDataUser)=>  ele.fullName.toLocaleLowerCase().includes(value.toLocaleLowerCase()) )
  }

}
