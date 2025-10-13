import { Pipe, PipeTransform } from '@angular/core';
import { IdataUsers } from '../../app/core/Interfaces/http';

@Pipe({
  name: 'dashSearchUsers',
  standalone: true
})
export class DashSearchUsersPipe implements PipeTransform {

  transform(value: IdataUsers[], valueSearch: string): IdataUsers[] {
     return value.filter((ele: IdataUsers) => ele.name.toLocaleLowerCase().includes(valueSearch.toLocaleLowerCase())
     ); 
    
    }

}
