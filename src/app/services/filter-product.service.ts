import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../core/Api/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {

  constructor(private _httpClient: HttpClient,) { }


  getSinglePro(id:string | number): Observable<any> {
    return this._httpClient.get(`${url}?id=${id}`)
  }
}
