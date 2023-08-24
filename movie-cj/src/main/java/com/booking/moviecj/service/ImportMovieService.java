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
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ImportMovieService{

    @Value("${rapidapiHost}")
    private String RAPIDAPI_HOST;

    @Value("${rapidapiKey}")
    private String RAPIDAPI_KEY;

    //Import movies with listed filters
    public List<ImportedMovie> fetchMovies(int startYear, int endYear, double minRating, double maxRating, String genre, String sort) {
        try {
            String url;

            //Api call does not support alphabetical so reset sort before call
            if ("alphabetical".equalsIgnoreCase(sort)) {
                url = constructURL(startYear, endYear, minRating, maxRating, genre, ""); // Set sort to empty for URL
            } else {
                url = constructURL(startYear, endYear, minRating, maxRating, genre, sort);
            }
            // Make HTTP request to the API
            String response = makeHttpRequest(url);
            // Parse the API response into a list of ImportedMovie objects
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

    //Construct api call based on existing inputs
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

    //Sends GET request to online Movie DB
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

    // Maps Response from API to Imported Movie Object
    private List<ImportedMovie> parseResponse(String response) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseMap = objectMapper.readValue(response, new TypeReference<Map<String, Object>>() {});
        List<Map<String, Object>> results = (List<Map<String, Object>>) responseMap.get("results");

        List<ImportedMovie> importedMovies = new ArrayList<>();

        //Iterate through the API results and map them to ImportedMovie objects
        for (Map<String, Object> result : results) {
            ImportedMovie movie = new ImportedMovie();
            movie.setImdbid((String) result.get("imdbid"));
            movie.setTitle((String) result.get("title"));

            Object imageurlObject = result.get("imageurl");
            if (imageurlObject instanceof List) {
                List<String> imageurlList = ((List<?>) imageurlObject)
                        .stream()
                        .map(Object::toString)
                        .collect(Collectors.toList());
                movie.setImageurl(imageurlList);
            }

            movie.setSynopsis((String) result.get("synopsis"));

            Object imdbRatingObject = result.get("imdbrating");
            if (imdbRatingObject instanceof Number) {
                movie.setImdbRating((int) ((Number) imdbRatingObject).doubleValue());
            }

            Object releaseDateObject = result.get("released");
            if (releaseDateObject instanceof Number) {
                movie.setReleaseDate(((Number) releaseDateObject).intValue());
            }

            Object genreObject = result.get("genre");
            if (genreObject instanceof List) {
                List<String> genreList = castListToStringList((List<?>) genreObject);
                movie.setGenre(genreList);
            }

            importedMovies.add(movie);
        }

        return importedMovies;
    }

    //Helper method to convert a list of objects to a list of strings
    private List<String> castListToStringList(List<?> list) {
        return list.stream()
                .map(Object::toString)
                .collect(Collectors.toList());
    }
}
