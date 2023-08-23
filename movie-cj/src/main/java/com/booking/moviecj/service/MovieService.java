package com.booking.moviecj.service;

import com.booking.moviecj.database.MovieRepository;
import com.booking.moviecj.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Movie updatedMovie) {
        // Check if the movie exists in the database
        Optional<Movie> optionalMovie = movieRepository.findById(updatedMovie.getMovieId());
        if (optionalMovie.isPresent()) {
            Movie existingMovie = optionalMovie.get();
            // Perform partial updates for provided fields
            if (updatedMovie.getTitle() != null) {
                existingMovie.setTitle(updatedMovie.getTitle());
            }
            if (updatedMovie.getDuration() != null) {
                existingMovie.setDuration(updatedMovie.getDuration());
            }
            if (updatedMovie.getGenre() != null) {
                existingMovie.setGenre(updatedMovie.getGenre());
            }
            if (updatedMovie.getTicketPrice() != null) {
                existingMovie.setTicketPrice(updatedMovie.getTicketPrice());
            }
            if (updatedMovie.getRating() != null){
                existingMovie.setRating(updatedMovie.getRating());
            }
            if (updatedMovie.getTimeSlots() != null) {
                handleTimeSlots(existingMovie, Arrays.asList(updatedMovie.getTimeSlots().split(",")));
            }

            if (updatedMovie.getGenre() != null) {
                // Merge genres (if provided) and avoid duplicates
                List<String> mergedGenres = mergeGenres(existingMovie.getGenre(), updatedMovie.getGenre());
                existingMovie.setGenre(mergedGenres);
            }
            return movieRepository.save(existingMovie);
        } else {
            return null;
        }
    }

    private List<String> mergeGenres(List<String> existingGenres, List<String> updatedGenres) {
        Set<String> mergedGenres = new HashSet<>(existingGenres);
        mergedGenres.addAll(updatedGenres);
        return new ArrayList<>(mergedGenres);
    }

    // Helper method to handle unique time slots for movie updates
    private void handleTimeSlots(Movie existingMovie, List<String> updatedTimeSlots) {
        List<String> timeSlots = new ArrayList<>(Arrays.asList(existingMovie.getTimeSlots().split(",")));

        for (String updatedTimeSlot : updatedTimeSlots) {
            if (!timeSlots.contains(updatedTimeSlot)) {
                timeSlots.add(updatedTimeSlot);
            }
        }

        existingMovie.setTimeSlots(String.join(",", timeSlots));
    }



    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> getEnabledMovies() {
        return movieRepository.findByEnabled(true);
    }

    public Movie getMovieById(int movieId) {

        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        return movieOptional.orElse(null);
    }

    public String getMovieTitleByID(Integer movieId) {
        Optional<Movie> movieOptional = Optional.ofNullable(this.getMovieById(movieId));

        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            String title = movie.getTitle();
            return title;
        } else {
            return null;
        }
    }

    public Boolean deleteMovieByID(Integer movieId) {
        Optional<Movie> movieOptional = Optional.ofNullable(this.getMovieById(movieId));

        if(movieOptional.isPresent()){
            this.movieRepository.deleteById(movieId);
            return true;
        }else{
            return false;
        }
    }

    public void toggleMovieStatus(List<Integer> movieIds) {
        List<Movie> moviesToUpdate = movieRepository.findAllByMovieIdIn(movieIds);
        for(Movie movie: moviesToUpdate){
            movie.setEnabled(!movie.getEnabled());
        }
        movieRepository.saveAll(moviesToUpdate);

    }


}
