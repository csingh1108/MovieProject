package com.booking.moviecj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int movieId;                 // ID generated automatically

    private String title;                // Title of the movie
    private String timeSlots;            // Available time slots for the movie
    private Double rating;               // Rating of the movie
    private String releaseDate;          // Release date of the movie
    private String imageurl;             // URL of the movie's image
    private Integer duration;            // Duration of the movie in minutes
    private String ticketPrice;          // Ticket price for the movie
    private String synopsis;             // Synopsis of the movie

    @ElementCollection
    private List<String> genre;          // List of genres associated with the movie

    private Boolean enabled = false;      // Status indicating whether the movie is enabled or not
}
