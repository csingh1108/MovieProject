import { Component, OnInit } from '@angular/core';
import { GroupedBookingsResponse } from "../bookingresponseDTO";
import { BookingInfoService } from "../booking-info.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-corporate-bookings',
  templateUrl: './corporate-bookings.component.html',
  styleUrls: ['./corporate-bookings.component.css']
})
export class CorporateBookingsComponent implements OnInit {

  bookings!: GroupedBookingsResponse;

  constructor(
    private bookingService: BookingInfoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getGroupedBookings();
  }

  // Fetch grouped bookings and assign response to 'bookings'
  getGroupedBookings() {
    this.bookingService.fetchAllBookings().subscribe(
      (response) => {
        this.bookings = response;
      },
      (error) => {
        this.openSnackBar("There was an error fetching the data.", "OK");
        console.log("Error", error);
      }
    );
  }

  // Display a snackbar notification
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  // Refresh data by fetching grouped bookings again
  refreshData() {
    this.getGroupedBookings();
  }

  // Delete a booking after user confirmation
  deleteBooking(bookingId: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        (response: any) => {
          if (response.name && response.message === "Booking deleted successfully") {
            this.openSnackBar(`Booking ID: ${bookingId} was deleted`, "OK");
            this.getGroupedBookings();
          } else {
            this.openSnackBar("There was an error. Try again later", "OK");
          }
        },
        (error) => {
          console.error('Error deleting booking:', error);
        }
      );
    }
  }
}
