import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MovieInfoService} from "../movie-info.service";
import {MovieDto} from "../movie-dto";

@Component({
  selector: 'app-corporate-movies',
  templateUrl: './corporate-movies.component.html',
  styleUrls: ['./corporate-movies.component.css']
})
export class CorporateMoviesComponent implements OnInit{

  allMovies: Array<any> = [];
  isMovieEnabled!: boolean;
  changedMovieIds: number[] = [];

  constructor(private movieService: MovieInfoService,
              private snackBar:MatSnackBar) {
  }
  ngOnInit(): void {
    this.movieService.getallMovies()
      .subscribe(response => {
        this.allMovies = response;
      })
  }

  fetchMoviesData() {
    this.movieService.getallMovies().subscribe(
      (response: any[]) => {
        this.allMovies = response;
      },
      (error) => {
        console.error('Error fetching users', error)
      }
    )
  }

  refreshData() {
    this.fetchMoviesData();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  deleteMovie(movieId: number) {
    if (confirm('Are you sure you want to delete this movie?')) {
      if (confirm('This action is irreversible. Are you really sure?')) {
        this.movieService.deleteMovie(movieId).subscribe(
          (response:any) =>{
           if (response.name && response.message === "Movie deleted successfully") {
              this.openSnackBar(`${response.name} was deleted`, "OK");
              this.refreshData();
            } else {
              this.openSnackBar("There was an error. Try again later", "OK");
            }
           },
      (error) => {
        console.error('Error deleting user:', error);
      }
        )
      }
    }
  }

  isAllFieldsFilled(movie: MovieDto): "" | 0 | number {
    return (
      movie.title &&
      movie.timeSlots &&
      movie.rating &&
      movie.imageurl &&
      movie.duration &&
      movie.ticketPrice &&
      movie.synopsis &&
      movie.genre &&
      movie.movieId
    );
  }

  changeMovieStatus(movieId: number) {
    this.isMovieEnabled = !this.isMovieEnabled;
    const existingIndex = this.changedMovieIds.indexOf(movieId);

    if (existingIndex !== -1) {
      // If the movie has returned to its initial state, remove it from tracking
      this.changedMovieIds.splice(existingIndex, 1);
    } else {
      // If the movie is not yet in the tracking array, add it
      this.changedMovieIds.push(movieId);
    }
    console.log(this.changedMovieIds);
  }

  submitChanges() {
    // Call the service method to submit changes to the backend
    this.movieService.submitChanges(this.changedMovieIds)
      .subscribe(
        response => {
          this.openSnackBar(response, "OK");
        },
        err => {
          this.openSnackBar("There was an error. Try again later.", "OK");
        }
      );
    this.changedMovieIds=[];
  }
}
