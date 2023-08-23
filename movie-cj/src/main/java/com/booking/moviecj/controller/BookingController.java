package com.booking.moviecj.controller;

import com.booking.moviecj.model.Booking;
import com.booking.moviecj.model.BookingResponseDTO;
import com.booking.moviecj.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create a booking
    @PostMapping("/book")
    public ResponseEntity<Booking> createBooking(
            @RequestParam(value = "userId", required = false) Integer userId,
            @RequestParam("movieTitle") String movieTitle,
            @RequestParam("selectedTime") String selectedTime,
            @RequestParam("ticketCount") int ticketCount,
            @RequestParam("total") double total,
            @RequestParam("selectedSeats") List<String> selectedSeats) {


        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setMovieTitle(movieTitle);
        booking.setSelectedTime(selectedTime);
        booking.setTicketCount(ticketCount);
        booking.setTotal(total);
        booking.setSelectedSeats(selectedSeats);

        boolean success = bookingService.createBooking(booking);

        return success
                ? new ResponseEntity<>(booking, HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Get all bookings grouped by user
    @GetMapping("/all")
    public ResponseEntity<Map<String, Map<String, List<BookingResponseDTO>>>> getBookingsWithUsername() {
        Map<String, Map<String, List<BookingResponseDTO>>> groupedBookings = bookingService.getAllBookingsGroupedByUser();
        return new ResponseEntity<>(groupedBookings, HttpStatus.OK);
    }

    // Delete a booking by ID
    @DeleteMapping("/deleteBooking")
    public ResponseEntity<Map<String, String>> deleteBooking(@RequestParam Integer bid) {
        boolean bookingDeleted = bookingService.deleteBookingByID(bid);

        Map<String, String> response = new HashMap<>();
        response.put("message", bookingDeleted ? "Booking deleted successfully" : "No Booking Found");
        response.put("name", String.valueOf(bookingDeleted));

        return bookingDeleted
                ? new ResponseEntity<>(response, HttpStatus.OK)
                : new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}



