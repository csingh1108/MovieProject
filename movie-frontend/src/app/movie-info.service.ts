import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MovieDto} from "./movie-dto";
import {importedMovie} from "./importedmovie-dto";
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieInfoService {

  constructor(private httpClient: HttpClient) { }

  getallMovies() {
    const url = `http://localhost:8080/api/movies/all`;
    return this.httpClient.get<Array<MovieDto>>(url);
  }

  getEnabledMovies() {
    const url = `http://localhost:8080/api/movies/enabled`;
    return this.httpClient.get<Array<MovieDto>>(url);
  }

  updateMovieDetails(movieId: number, updatedMovie: {
    duration: number;
    ticketPrice: number;
    rating: number;
    genre: string;
    movieId: number;
    timeSlots: string;
    synopsis: string;
    title: string
  }) {
    const url = `http://localhost:8080/api/movies/update/${movieId}`;

    return this.httpClient.put(url, updatedMovie, { responseType: 'text' });
  }

  deleteMovie(movieId: number) {
    const url = `http://localhost:8080/api/movies/delete/${movieId}`;

    return this.httpClient.delete(url);
  }

    importMovies(startYear?: number, endYear?: number, minRating?: number, maxRating?: number, genre?: string | null, sort?: string, searchText?: string) {
    const url = `http://localhost:8080/api/movies/importMovies`;

    let params = new HttpParams();
      if (startYear !== undefined) {
        params = params.set('startYear', startYear.toString());
      } else {
        params = params.set('startYear', '1980');
      }

      if (endYear === undefined) {
        endYear = new Date().getFullYear() - 1;
      }
      params = params.set('endYear', endYear.toString());

      if (minRating !== undefined) {
        params = params.set('minRating', minRating.toString());
      } else {
        params = params.set('minRating', '0');
      }

      if (maxRating !== undefined) {
        params = params.set('maxRating', maxRating.toString());
      } else {
        params = params.set('maxRating', '10');
      }
    if (genre !== undefined) {
      // @ts-ignore
        params = params.set('genre', genre);
    }
    if (sort !== undefined) {
      params = params.set('sort', sort);
    }
    if (searchText !== undefined){
      params = params.set('searchText', searchText);
    }



    return this.httpClient.get<importedMovie[]>(url, { params });
  }


  sendConfirmedMovies(confirmedMovies: MovieDto[]): Observable<any> {
    const url = `http://localhost:8080/api/movies/importMoviesToDB`;
    const requests: Observable<any>[] = [];

    for (const movie of confirmedMovies) {
      const queryParams: Record<string, string | number> = {
        title: movie.title,
        rating: movie.rating.toString(),
        releaseYear: movie.releaseDate.toString(),
        imageurl: movie.imageurl,
        synopsis: movie.synopsis,
        genre: movie.genre.join(',')
      };

      const queryString = Object.keys(queryParams)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
          .join('&');

      const fullUrl = `${url}?${queryString}`;

      const request = this.httpClient.post(fullUrl, {});
      requests.push(request);
    }

    return forkJoin(requests);
  }


  submitChanges(changedMovieIds: number[]) {
    const url = `http://localhost:8080/api/movies/updateMovieStatus`;

    return this.httpClient.post<any>(url, changedMovieIds);
  }


}
