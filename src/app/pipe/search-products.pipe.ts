import { IProduct } from '../core/Interfaces/http';
import { ShowOvarLayService } from './../services/show-ovar-lay.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchProducts',
  standalone: true
})
export class SearchProductsPipe implements PipeTransform {
  constructor(private _ShowOvarLayService:ShowOvarLayService){}

  transform(array: IProduct[],value: string): IProduct[] {
    value = this._ShowOvarLayService.searchInp 
  //  console.log(array)
    return  array.filter((ele) =>
     ele.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
    // console.log(ele.title)
    
    ) 
  }

}
