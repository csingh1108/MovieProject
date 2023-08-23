import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookingDto} from "./booking-dto";
import {GroupedBookingsResponse} from "./bookingresponseDTO";

@Injectable({
  providedIn: 'root'
})
export class BookingInfoService {

  movieTitle: string | undefined ;
  selectedTimeSlot: string | null = null;
  ticketCount: number = 0;
  totalTicketPrice: number = 0;
  selectedSeats: string[] = [];


  constructor(private httpClient: HttpClient) { }

  createBooking(userID: number | null) {
    const movieTitleParam: string = this.movieTitle || '';

    let url = `http://localhost:8080/api/booking/book?movieTitle=${encodeURIComponent(movieTitleParam)}&selectedTime=${this.selectedTimeSlot}&ticketCount=${this.ticketCount}&total=${this.totalTicketPrice}&selectedSeats=${this.selectedSeats}`;

    if (userID !== null) {
      url += `&userId=${userID}`;
    }
    return this.httpClient.post<BookingDto>(url, null);
  }

  fetchAllBookings(){
    const url = `http://localhost:8080/api/booking/all`;
    return this.httpClient.get<GroupedBookingsResponse>(url);
  }

  deleteBooking(bookingId: number) {
    const url = `http://localhost:8080/api/booking/deleteBooking?bid=${bookingId}`;
    return this.httpClient.delete<JSON>(url);
  }
}
