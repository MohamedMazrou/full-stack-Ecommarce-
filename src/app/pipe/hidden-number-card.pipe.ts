import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenNumberCard',
  standalone: true
})
export class HiddenNumberCardPipe implements PipeTransform {

  transform(value:string | number): string {
    return value.toString().slice(-4).padStart(value.toString().length,'*');
  }

}
