package com.booking.moviecj.service;

import com.booking.moviecj.model.ImportedMovie;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ImportMovieService{

    @Value("${rapidapiHost}")
    private String RAPIDAPI_HOST;

    @Value("${rapidapiKey}")
    private String RAPIDAPI_KEY;

    public List<ImportedMovie> fetchMovies(int startYear, int endYear, double minRating, double maxRating, String genre, String sort) {
        try {
            String url;

            if ("alphabetical".equalsIgnoreCase(sort)) {
                url = constructURL(startYear, endYear, minRating, maxRating, genre, ""); // Set sort to empty for URL
            } else {
                url = constructURL(startYear, endYear, minRating, maxRating, genre, sort);
            }

            String response = makeHttpRequest(url);

            List<ImportedMovie> importedMovies = parseResponse(response);

            // If sort was "alphabetical", sort the results alphabetically by title
            if ("alphabetical".equalsIgnoreCase(sort)) {
                importedMovies.sort(Comparator.comparing(ImportedMovie::getTitle));
            }

            return importedMovies;
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }


    private String constructURL(Integer startYear, Integer endYear, Double minRating, Double maxRating, String genre, String sort) {
        StringBuilder urlBuilder = new StringBuilder("https://ott-details.p.rapidapi.com/advancedsearch?type=movie&page=1");

        if (startYear != null) {
            urlBuilder.append("&start_year=").append(startYear);
        }
        if (endYear != null) {
            urlBuilder.append("&end_year=").append(endYear);
        }
        if (minRating != null) {
            urlBuilder.append("&min_imdb=").append(minRating);
        }
        if (maxRating != null) {
            urlBuilder.append("&max_imdb=").append(maxRating);
        }
        if (genre != null) {
            urlBuilder.append("&genre=").append(genre);
        }
        if (sort != null) {
            urlBuilder.append("&sort=").append(sort);
        }

        return urlBuilder.toString();
    }


    private String makeHttpRequest(String url) throws IOException, InterruptedException{
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("X-RapidAPI-Key", RAPIDAPI_KEY)
                .header("X-RapidAPI-Host", RAPIDAPI_HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    private List<ImportedMovie> parseResponse(String response) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseMap = objectMapper.readValue(response, new TypeReference<Map<String, Object>>() {});
        List<Map<String, Object>> results = (List<Map<String, Object>>) responseMap.get("results");

        List<ImportedMovie> importedMovies = results.stream()
                .map(result -> {
                    ImportedMovie movie = new ImportedMovie();
                    movie.setImdbid((String) result.get("imdbid"));
                    movie.setTitle((String) result.get("title"));
                    movie.setImageurl((List<String>) result.get("imageurl"));
                    movie.setSynopsis((String) result.get("synopsis"));

                    // Handle casting of imdbRating
                    Object imdbRatingObject = result.get("imdbrating");
                    if (imdbRatingObject instanceof Double) {
                        movie.setImdbRating(((Double) imdbRatingObject).intValue());
                    } else if (imdbRatingObject instanceof Integer) {
                        movie.setImdbRating((Integer) imdbRatingObject);
                    }

                    movie.setReleaseDate((Integer) result.get("released"));

                    // Handle casting of genre
                    List<String> genreList = (List<String>) result.get("genre");
                    movie.setGenre(genreList);

                    return movie;
                })
                .collect(Collectors.toList());

        return importedMovies;
    }




}
