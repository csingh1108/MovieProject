import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserInfoService} from "../user-info.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MovieInfoService} from "../movie-info.service";

@Component({
  selector: 'app-corporate-movies-edit',
  templateUrl: './corporate-movies-edit.component.html',
  styleUrls: ['./corporate-movies-edit.component.css']
})
export class CorporateMoviesEditComponent implements OnInit{

  movieId!: number;
  movieTitle!: string;
  movieTimeSlots!: string;
  movieRating!: number;
  movieImageurl!: string;
  movieDuration!: number;
  movieTicketPrice!: number;
  movieSynopsis!: string;
  movieGenre!: string;


  newMovieTitle!: string;
  newMovieTimeSlots!: string;
  newMovieRating!: number;
  newMovieTicketPrice!: number;
  newMovieDuration!: number;
  newMovieGenre!: string;
  newMovieSynopsis!: string;

  constructor(private route:ActivatedRoute,
              private backend:MovieInfoService,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // @ts-ignore
      this.movieId = +this.route.snapshot.paramMap.get('movieId');
      this.movieTitle = params['title'];
      this.movieTimeSlots = params['timeSlots'];
      this.movieRating = params['rating'];
      this.movieImageurl = params['imageurl'];
      this.movieDuration = params['duration'];
      this.movieTicketPrice = params['ticketPrice'];
      this.movieSynopsis = params['synopsis'];
      this.movieGenre = params['genre'];
    });
  }

  saveChanges(): void {
    // Update existing properties with new values
    if (this.newMovieTitle) {
      this.movieTitle = this.newMovieTitle;
    }
    if (this.newMovieTimeSlots) {
      this.movieTimeSlots = this.newMovieTimeSlots;
    }
    if (this.newMovieRating) {
      this.movieRating = this.newMovieRating;
    }
    if (this.newMovieTicketPrice) {
      this.movieTicketPrice = this.newMovieTicketPrice;
    }
    if (this.newMovieDuration) {
      this.movieDuration = this.newMovieDuration;
    }
    if (this.newMovieGenre) {
      this.movieGenre = this.newMovieGenre;
    }
    if (this.newMovieSynopsis) {
      this.movieSynopsis = this.newMovieSynopsis;
    }

    // Call backend service to update movie data
    const updatedMovie = {
      movieId: this.movieId,
      title: this.movieTitle,
      timeSlots: this.movieTimeSlots,
      rating: this.movieRating,
      ticketPrice: this.movieTicketPrice,
      duration: this.movieDuration,
      genre: this.movieGenre,
      synopsis: this.movieSynopsis
    };

    this.backend.updateMovieDetails(this.movieId, updatedMovie).subscribe(
      (response) => {
        this.openSnackBar("Movie updated successfully: "+response, "OK")
        console.log('Movie updated successfully:', response);
      },
      (error) => {
        this.openSnackBar("Error updating movie: " +error, "OK")
        console.error('Error updating movie:', error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
