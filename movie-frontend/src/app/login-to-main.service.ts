import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginToMainService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userDataNameSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userDataEmailSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private userID: number | null =null;
  private userRole: string = "USER";

  setIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  getIsLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  setUserName(userData:any){
    this.userDataNameSubject.next(userData);
  }

  setUserEmail(userData:any){
    this.userDataEmailSubject.next(userData);
  }

  getUserName(){
    return this.userDataNameSubject.asObservable();
  }

  getUserEmail(){
    return this.userDataEmailSubject.asObservable();
  }

  constructor() { }

  setUserID(uid: number) {
    this.userID = uid ;
  }

  getUserID(){
    return this.userID;
  }

  setUserRole(role: string){
    this.userRole = role;
  }

  getUserRole(){
    return this.userRole
  }
}
