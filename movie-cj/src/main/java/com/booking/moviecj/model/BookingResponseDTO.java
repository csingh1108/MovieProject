package com.booking.moviecj.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDTO {

    private Long id;                    // ID of the booking
    private String username;            // Username of the user who made the booking
    private String movieTitle;          // Title of the booked movie
    private String selectedTime;        // Time slot for the booking
    private int ticketCount;            // Number of tickets booked
    private double total;               // Total cost of the booking
    private String receiptId;           // Unique ID for the booking receipt
    private LocalDateTime receiptDate;  // Date and time when the receipt was generated
    private List<String> selectedSeats; // List of selected seats for the booking
}

