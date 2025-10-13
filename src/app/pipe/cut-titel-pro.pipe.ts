import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ProTitelcut',
  standalone: true
})
export class pro_Titel_Cut_Pipe implements PipeTransform {

  transform(value: string) :string{
    return value.slice(0,50);
  }

}
