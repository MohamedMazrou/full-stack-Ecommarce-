import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../core/Interfaces/http';

@Pipe({
  name: 'dashSearchProduct',
  standalone: true
})
export class DashSearchProductPipe implements PipeTransform {

  transform(arr:IProduct[],value:string): IProduct[] {
    return arr.filter(item => item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
  }

}
