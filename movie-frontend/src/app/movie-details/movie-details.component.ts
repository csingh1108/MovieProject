import {Component, OnInit} from '@angular/core';
import {MovieDto} from "../movie-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {BookingInfoService} from "../booking-info.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

  movie: MovieDto | null = null;
  selectedTimeSlot: string | null = null;
  ticketCount: number = 0;
  totalTicketPrice: number = 0;

  selectedSeats: string[] = [];
  availableSeats: number =0;

  seatRows: string[][] = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  ];

  constructor(private matSnackBar: MatSnackBar,
              private router: Router,
              private bookingService: BookingInfoService) {
  }
  ngOnInit(): void {
    this.movie = history.state.movieData;
  }

  selectTimeSlot(timeSlot: string) {
    this.selectedTimeSlot = timeSlot;
    this.selectedSeats = [];
    this.updateAvailableSeats();
  }
  increaseTicketCount() {
    this.ticketCount++;
    this.calculateTicketPrice();
    this.updateAvailableSeats();
  }

  decreaseTicketCount() {
    if (this.ticketCount > 0) {
      this.ticketCount--;
      this.calculateTicketPrice();
      this.updateAvailableSeats();


      if (this.ticketCount < this.selectedSeats.length) {
        this.selectedSeats.pop(); // Remove the last selected seat
        this.updateAvailableSeats();
      }
    }
  }
  calculateTicketPrice() {
    // @ts-ignore
    this.totalTicketPrice = this.ticketCount * this.movie?.ticketPrice;
  }

  selectSeat(seat: string) {
    if(!this.selectedTimeSlot){
      this.showErrorMessage("Please select a time slot");
      this.updateAvailableSeats();
      return;
    }

    if(this.availableSeats == 0 && !this.selectedSeats.includes(seat)){
      this.showErrorMessage("Please purchase more tickets.");
      return;
    }
    if((this.availableSeats > 0 || this.selectedSeats.includes(seat)) && this.selectedTimeSlot != null){
      const index= this.selectedSeats.indexOf(seat);

      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }else{
        this.selectedSeats.push(seat);
      }

      this.availableSeats = this.ticketCount - this.selectedSeats.length;
      if(this.availableSeats < 0){
        this.availableSeats = 0;
      }
    }
  }

  showErrorMessage(message: string){
    this.matSnackBar.open(message, "Close", {
      duration: 5000,
      panelClass:['snackbar-style']
    });
  }

  isSelected(seat: string) :boolean {
    return this.selectedSeats.includes(seat)
  }

  updateAvailableSeats() {
    this.availableSeats = this.ticketCount;
  }

  checkout() {
    if(this.selectedSeats.length ==0){
      this.showErrorMessage("Please select seats");
      return;
    }else{
      this.bookingService.movieTitle = this.movie?.title;
      this.bookingService.selectedTimeSlot = this.selectedTimeSlot;
      this.bookingService.selectedSeats = this.selectedSeats;
      this.bookingService.ticketCount = this.ticketCount;
      this.bookingService.totalTicketPrice = this.totalTicketPrice;
      this.router.navigateByUrl('/confirm')
    }
  }

  cancel() {
    this.router.navigateByUrl('')
  }
}
