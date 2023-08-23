export interface GroupedBookingsResponse {
  [username: string]: {
    bookings: BookingResponseDTO[];
  };
}

export interface BookingResponseDTO {
  id: number;
  username: string;
  movieTitle: string;
  selectedTime: string;
  ticketCount: number;
  total: number;
  receiptId: string;
  receiptDate: string;
  selectedSeats: string[];
}
