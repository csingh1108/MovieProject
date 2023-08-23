import {Component, OnInit} from '@angular/core';
import {ConfirmToThanksService} from "../confirm-to-thanks.service";
import {BookingDto} from "../booking-dto";

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit{

  bookingData!: BookingDto | undefined;
  userName: string = ''
  userEmail: string = '';
  movieTitle: string | undefined = '';
  movieTime: string | undefined = '';
  totalCost: string = '';
  seatNumbers: string = '';
  receiptId: string | undefined = '';
  receiptDate: string | undefined = '';

  constructor(private C2TService: ConfirmToThanksService) {

  }

  ngOnInit(): void {
    this.bookingData = this.C2TService.getBookingData();
    this.userName = this.C2TService.getName();
    this.userEmail = this.C2TService.getEmail();
    this.movieTitle = this.bookingData?.movieTitle;
    this.movieTime = this.bookingData?.selectedTime;
    this.totalCost = String(this.bookingData?.total);
    this.seatNumbers = this.bookingData?.selectedSeats.join(", ") ?? '';
    this.receiptId = this.bookingData?.receiptId;
    this.receiptDate = this.bookingData?.receiptDate;


  }
}
