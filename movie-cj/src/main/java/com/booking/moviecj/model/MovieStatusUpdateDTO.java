package com.booking.moviecj.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieStatusUpdateDTO {

    private List<Long> enabledMovieIDs;    // List of movie IDs to be enabled
    private List<Long> disabledMovieIDs;   // List of movie IDs to be disabled
}
