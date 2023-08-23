package com.booking.moviecj.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ImportedMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int importedId;                // ID generated automatically

    private String imdbid;                 // IMDB ID of the movie
    private String title;                  // Title of the movie

    @ElementCollection
    private List<String> imageurl;         // List of image URLs associated with the movie

    private String synopsis;               // Synopsis of the movie
    private Integer imdbRating;            // IMDB rating of the movie
    private Integer releaseDate;           // Release date of the movie

    @ElementCollection
    private List<String> genre;            // List of genres associated with the movie
}
