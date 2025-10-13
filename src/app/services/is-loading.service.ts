import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {

  public IsLoading: boolean = false
 public  isLoadingSkeleton: boolean = true 



  setStatus(value:boolean,valueSkeleton:boolean):void{
      this.IsLoading = value
      this.isLoadingSkeleton = valueSkeleton
  }
}
