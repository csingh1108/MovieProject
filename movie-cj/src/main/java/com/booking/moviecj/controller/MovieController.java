package com.booking.moviecj.controller;

import com.booking.moviecj.model.ImportedMovie;
import com.booking.moviecj.model.Movie;
import com.booking.moviecj.model.MovieStatusUpdateDTO;
import com.booking.moviecj.service.ImportMovieService;
import com.booking.moviecj.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    private final ImportMovieService importMovieService;


    @Autowired
    public MovieController(MovieService movieService, ImportMovieService importMovieService) {
        this.movieService = movieService;
        this.importMovieService = importMovieService;
    }

    // Create a movie
    @PostMapping
    public ResponseEntity<String> createMovie(@RequestParam String title,
                                      @RequestParam String timeSlots,
                                      @RequestParam Double rating,
                                      @RequestParam String releaseYear,
                                      @RequestParam String imageurl,
                                      @RequestParam String synopsis,
                                      @RequestParam Integer duration,
                                      @RequestParam String genre,
                                      @RequestParam String ticketPrice) {
        Movie movie = new Movie();
        movie.setTitle(title);
        movie.setTimeSlots(timeSlots);
        movie.setDuration(duration);
        movie.setRating(rating);
        movie.setReleaseDate(releaseYear);
        movie.setImageurl(imageurl);
        movie.setSynopsis(synopsis);
        List<String> genreList = Arrays.asList(genre.split(","));
        movie.setGenre(genreList);
        movie.setTicketPrice(ticketPrice);

        Movie createdMovie = movieService.createMovie(movie);
        return createdMovie != null
                ? new ResponseEntity<>(createdMovie.getTitle() + " has been added to the database.", HttpStatus.CREATED)
                : new ResponseEntity<>("Failed to register the movie.", HttpStatus.INTERNAL_SERVER_ERROR);

    }


    // Update a movie
    @PutMapping("/update/{movieId}")
    public ResponseEntity<String> updateMovie(@PathVariable int movieId, @RequestBody Movie updatedMovie) {
        Movie existingMovie = movieService.getMovieById(movieId);
        if (existingMovie == null) {
            return new ResponseEntity<>("Failed to update the movie. Movie not found.", HttpStatus.NOT_FOUND);
        }
        // Update existingMovie fields with updatedMovie values
        updateMovieFields(existingMovie, updatedMovie);
        Movie updatedMovieResult = movieService.updateMovie(existingMovie);
        return updatedMovieResult != null
                ? new ResponseEntity<>(updatedMovieResult.getTitle() + " has been updated.", HttpStatus.OK)
                : new ResponseEntity<>("Failed to update the movie. Movie not found.", HttpStatus.NOT_FOUND);
    }

    // Get all movies
    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Get enabled movies
    @GetMapping("/enabled")
    public ResponseEntity<List<Movie>> getEnabledMovies() {
        List<Movie> movies = movieService.getEnabledMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Delete a movie by ID
    @DeleteMapping("/delete/{movieId}")
    public ResponseEntity<Map<String, String>> deleteMovie(@PathVariable Integer movieId){
        String deletedMovie = movieService.getMovieTitleByID(movieId);
        Boolean movieDeleted = movieService.deleteMovieByID(movieId);

        Map<String, String> response = new HashMap<>();
        response.put("message", movieDeleted ? "Movie deleted successfully" : "No Movie Found");
        response.put("name", deletedMovie);
        return movieDeleted
                ? new ResponseEntity<>(response, HttpStatus.OK)
                : new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Import movies with optional filters
    @GetMapping("/importMovies")
    public ResponseEntity<List<ImportedMovie>> importMovies(
            @RequestParam(required = false) Integer startYear,
            @RequestParam(required = false) Integer endYear,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxRating,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String searchText) {

        List<ImportedMovie> importedMovies = importMovieService.fetchMovies(startYear, endYear, minRating, maxRating, genre, sort);
        // Apply search filter if searchText is provided
        applySearchFilter(importedMovies, searchText);

        return new ResponseEntity<>(importedMovies, HttpStatus.OK);
    }

    // Add an imported movie to the database
    @PostMapping("/importMoviesToDB")
    public ResponseEntity<Map<String, String>> addImportedMovieToDB(@RequestBody Movie movie) {
        Movie createdMovie = movieService.createMovie(movie);
        if (createdMovie != null) {
            Map<String, String> response = new HashMap<>();
            response.put("name", "Movie(s) added successfully");
            response.put("message", createdMovie.getTitle() + " has been added to the database.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update movie status
    @PostMapping("/updateMovieStatus")
    public ResponseEntity<Map<String, String>> updateMovies(@RequestBody List<Integer> changedMovieIds) {
        try {
            movieService.toggleMovieStatus(changedMovieIds);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Movies updated successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error updating: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Helper methods
    private void updateMovieFields(Movie existingMovie, Movie updatedMovie) {
        // Update the fields that are provided in the updated movie
        if (updatedMovie.getTitle() != null) {
            existingMovie.setTitle(updatedMovie.getTitle());
        }
        if (updatedMovie.getDuration() != null) {
            existingMovie.setDuration(updatedMovie.getDuration());
        }
        if (updatedMovie.getTicketPrice() != null) {
            existingMovie.setTicketPrice(updatedMovie.getTicketPrice());
        }
        if (updatedMovie.getRating() != null) {
            existingMovie.setRating(updatedMovie.getRating());
        }
        if (updatedMovie.getGenre() != null) {
            existingMovie.setGenre(updatedMovie.getGenre());
        }
        if (updatedMovie.getTimeSlots() != null) {
            existingMovie.setTimeSlots(updatedMovie.getTimeSlots());
        }
        if (updatedMovie.getSynopsis() != null) {
            existingMovie.setSynopsis(updatedMovie.getSynopsis());
        }

    }


    private void applySearchFilter(List<ImportedMovie> movies, String searchText) {
        if (searchText != null && !searchText.isEmpty()) {
            movies.removeIf(movie -> !movie.getTitle().toLowerCase().contains(searchText.toLowerCase()));
        }
    }
}
