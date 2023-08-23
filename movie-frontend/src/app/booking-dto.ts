export interface BookingDto{
  userId: number;
  movieTitle: string;
  selectedTime: string;
  ticketCount: number;
  total: number;
  receiptId: string;
  receiptDate: string;
  selectedSeats: string[];
}
