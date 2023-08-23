import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService {

  private isPaidForSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setPaidStatus(value:boolean) {
    this.isPaidForSubject.next(value);
  }

  getPaidStatus(){
    return this.isPaidForSubject.asObservable();
  }


  constructor() { }
}
