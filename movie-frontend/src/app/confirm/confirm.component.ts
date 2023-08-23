import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginToMainService } from "../login-to-main.service";
import { ConfirmToThanksService } from "../confirm-to-thanks.service";
import { PaymentInfoService } from "../payment-info.service";
import {BookingDto} from "../booking-dto";
import {BookingInfoService} from "../booking-info.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  isPaidFor = false;
  name!: string;
  email!: string;

  constructor(private router: Router,
              public loginToMainService: LoginToMainService,
              private C2TService: ConfirmToThanksService,
              private paymentInfoService: PaymentInfoService,
              private bookingService: BookingInfoService,
              private location: Location) { }

  ngOnInit(): void {
    this.setFields();
  }

  // Fetch necessary fields on component initialization
  setFields() {
    if (this.loginToMainService.getIsLoggedIn()) {
      this.loginToMainService.getUserName().subscribe((userName: string) => {
        this.name = userName;
      });

      this.loginToMainService.getUserEmail().subscribe((userEmail: string) => {
        this.email = userEmail;
      });
    }

    this.paymentInfoService.getPaidStatus().subscribe((response: boolean) => {
       this.isPaidFor = response;
       console.log(this.isPaidFor);
    });
  }

  // Proceed to thanks page based on payment and user data
  continueToThanks() {
    if (!this.isPaidFor || !this.name || !this.email) {
      // Do not proceed if required data is missing
      return;
    }

    let userId: number | null = null;

    this.loginToMainService.getIsLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        userId = this.loginToMainService.getUserID();
      }
      this.C2TService.setName(this.name);
      this.C2TService.setEmail(this.email);


      this.bookingService.createBooking(userId)
        .subscribe(
          (response: BookingDto) => {
            this.C2TService.setBookingData(response);
            this.router.navigate(['thanks']);
          },
          (error) => {
            console.error("An error occurred during booking:", error);
          });
    });
  }




  // Navigate back to the previous page
  navigateBack() {
    this.location.back();
  }
}

