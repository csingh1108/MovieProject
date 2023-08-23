package com.booking.moviecj.database;

import com.booking.moviecj.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    List<Movie> findAllByMovieIdIn(List<Integer> movieIds);

    List<Movie> findByEnabled(boolean enabled);
}
