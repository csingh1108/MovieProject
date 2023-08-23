package com.booking.moviecj.service;

import com.booking.moviecj.database.BookingRepository;
import com.booking.moviecj.database.UserRepository;
import com.booking.moviecj.model.Booking;
import com.booking.moviecj.model.BookingResponseDTO;
import com.booking.moviecj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository){
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public boolean createBooking(Booking booking){
        try{
            bookingRepository.save(booking);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public Map<String, Map<String, List<BookingResponseDTO>>> getAllBookingsGroupedByUser() {
        List<Booking> allBookings = bookingRepository.findAll();

        // Map user IDs to usernames for bookings with non-null userId
        Map<Integer, String> userIdToUsername = userRepository.findAllById(allBookings.stream()
                        .filter(booking -> booking.getUserId() != null)
                        .map(Booking::getUserId)
                        .collect(Collectors.toList()))
                .stream()
                .collect(Collectors.toMap(User::getUid, User::getUsername));

        // Group bookings by username for bookings with non-null userId
        Map<String, List<BookingResponseDTO>> bookingsByUsername = allBookings.stream()
                .filter(booking -> booking.getUserId() != null)
                .map(booking -> mapToBookingResponseDTO(booking, userIdToUsername.get(booking.getUserId())))
                .collect(Collectors.groupingBy(BookingResponseDTO::getUsername));

        // Create final result map including bookings with null userIds
        Map<String, Map<String, List<BookingResponseDTO>>> groupedBookings = new HashMap<>();

        // Add bookings with null userIds
        groupedBookings.putAll(allBookings.stream()
                .filter(booking -> booking.getUserId() == null)
                .collect(Collectors.toMap(
                        booking -> "NoUser",
                        booking -> Map.of("bookings", List.of(mapToBookingResponseDTO(booking, null)))
                )));

        // Add grouped bookings with userIds and usernames
        bookingsByUsername.forEach((username, bookings) -> {
            groupedBookings.put(username, Map.of("bookings", bookings));
        });

        return groupedBookings;
    }



    private BookingResponseDTO mapToBookingResponseDTO(Booking booking, String username) {
        return new BookingResponseDTO(
                booking.getId(),
                username,
                booking.getMovieTitle(),
                booking.getSelectedTime(),
                booking.getTicketCount(),
                booking.getTotal(),
                booking.getReceiptId(),
                booking.getReceiptDate(),
                booking.getSelectedSeats()
        );
    }

    public Boolean deleteBookingByID(Integer bid) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bid);

        if(bookingOptional.isPresent()){
            Booking booking = bookingOptional.get();
            bookingRepository.delete(booking);
            return true;
        }else{
            return false;
        }
    }
}
