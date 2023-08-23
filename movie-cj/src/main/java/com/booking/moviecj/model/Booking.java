package com.booking.moviecj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer userId;           // ID of the user making the booking
    private String movieTitle;        // Title of the booked movie
    private String selectedTime;      // Time slot for the booking
    private int ticketCount;          // Number of tickets booked
    private double total;             // Total cost of the booking

    private String receiptId;         // Unique ID for the booking receipt
    private LocalDateTime receiptDate; // Date and time when the receipt was generated


    // This method is automatically executed before the entity is persisted (saved) to the database.
    @PrePersist
    protected void onCreateI() {
        this.receiptId = UUID.randomUUID().toString(); // Generate a unique receipt ID using UUID
        this.receiptDate = LocalDateTime.now();         // Record the current date and time
    }

    @ElementCollection
    private List<String> selectedSeats; // List of selected seats for the booking
}
