import { Injectable } from '@angular/core';
import {BookingDto} from "./booking-dto";

@Injectable({
  providedIn: 'root'
})
export class ConfirmToThanksService {
  private bookingData: BookingDto | undefined;

  private confirmedName!:string;
  private confirmedEmail!: string;

  setBookingData(data: BookingDto) {
    this.bookingData = data;
  }

  getBookingData() {
    return this.bookingData;
  }

  setName(name: string) {
    this.confirmedName = name;
  }

  getName(){
    return this.confirmedName;
  }

  setEmail(email: string) {
    this.confirmedEmail = email;
  }

  getEmail(){
    return this.confirmedEmail;
  }
}
