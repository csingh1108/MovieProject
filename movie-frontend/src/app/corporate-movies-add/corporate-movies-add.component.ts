import {Component, OnInit} from '@angular/core';
import {MovieInfoService} from "../movie-info.service";
import {importedMovie} from "../importedmovie-dto";
import {FormControl} from "@angular/forms";
import {MovieDto} from "../movie-dto";
import {MatSnackBar} from "@angular/material/snack-bar";



interface SortBy {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-corporate-movies-add',
  templateUrl: './corporate-movies-add.component.html',
  styleUrls: ['./corporate-movies-add.component.css']
})
export class CorporateMoviesAddComponent implements OnInit{

  importedMovies!: importedMovie[]

  addedMovies: string[] = [];

  startYearTemp!: number;
  endYearTemp!: number;
  minRatingTemp!: number;
  maxRatingTemp!: number;
  genreTemp!: string;
  sortTemp!: string;
  searchText: string = "";

  yearSliderControl1 : FormControl;
  yearSliderControl2 : FormControl;
  ratingSliderControl1: FormControl;
  ratingSliderControl2: FormControl;

  genres = new FormControl('');
  genreList: string[] = ['Action' , 'Adventure', 'Biography', 'Comedy', 'Crime','Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];

  sortBy: SortBy[] =[
    {value: 'highestrated', viewValue: 'Highest Rating'},
    {value: 'lowestrated', viewValue: 'Lowest Rating'},
    {value: 'latest', viewValue: 'Newest'},
    {value: 'oldest', viewValue: 'Oldest'},
    {value: 'alphabetical', viewValue: 'Alphabetical Order'}
  ]


  constructor(private movieService: MovieInfoService, private snackBar: MatSnackBar) {
    this.yearSliderControl1 = new FormControl(1980);
    this.yearSliderControl2 = new FormControl(2023);
    this.ratingSliderControl1 = new FormControl(0);
    this.ratingSliderControl2 = new FormControl(10);
  }

  ngOnInit(): void {
    // @ts-ignore
    this.searchImportedMovies()
  }

  formatLabel(value: number): string {

    return `${value}`;
  }

  searchImportedMovies(startYear:number, endYear:number, minRating:number, maxRating:number, genre: string, sort: string){
    this.startYearTemp = startYear;
    this.endYearTemp = endYear;
    this.minRatingTemp = minRating;
    this.maxRatingTemp = maxRating;
    this.genreTemp = genre;
    this.sortTemp = sort;
    this.movieService.importMovies(startYear, endYear, minRating, maxRating, genre, sort)
      .subscribe(
        (response: importedMovie[]) => {
          this.importedMovies = response;
        },
        (error)=> {
          console.error("An error occurred:", error);
        }
      )
  }

  refreshData() {
    this.searchImportedMovies(this.startYearTemp, this.endYearTemp, this.minRatingTemp, this.maxRatingTemp, this.genreTemp, this.sortTemp)
  }

  toggleAddedStatus(imdbid: string) {
    if (this.addedMovies.includes(imdbid)) {
      this.addedMovies = this.addedMovies.filter(id => id !== imdbid);
    } else {
      this.addedMovies.push(imdbid);
    }
  }

  applyFilters() {
    const startYear = this.yearSliderControl1.value || this.startYearTemp;
    const endYear = this.yearSliderControl2.value || this.endYearTemp;
    const minRating = this.ratingSliderControl1.value || this.minRatingTemp;
    const maxRating = this.ratingSliderControl2.value || this.maxRatingTemp;
    const selectedGenres = this.genres.value || this.genreTemp;
    const selectedSort = this.sortTemp
    const searchText= this.searchText

    // Call the API or perform processing with the filter values
    this.movieService.importMovies(startYear, endYear, minRating, maxRating, selectedGenres, selectedSort, searchText)
      .subscribe((response: importedMovie[]) => {
        this.importedMovies = response;
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  confirmMovies() {
    const snackBarRef = this.snackBar.open('Are you sure you want to add these movies?', 'Confirm', {
      duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      const movieDtos: MovieDto[] = [];

      for (const imdbId of this.addedMovies) {
        const movie = this.importedMovies.find(movie => movie.imdbid === imdbId);

        if (movie) {
          const movieDto: {
            releaseDate: string;
            imageurl: string;
            rating: number;
            genre: string[];
            synopsis: string;
            title: string
          } = {
            title: movie.title,
            rating: movie.imdbRating,
            releaseDate: movie.releaseDate.toString(),
            imageurl: movie.imageurl,
            synopsis: movie.synopsis,
            genre: movie.genre
          };

          movieDtos.push(<MovieDto>movieDto);
        }
      }

      try {
        this.movieService.sendConfirmedMovies(movieDtos)
          .subscribe(response => {
            this.openSnackBar("Movie(s) added successfully", "OK");
            console.log(response)
          });
        this.addedMovies = [];
      } catch (error) {
        this.openSnackBar('Error sending movies to backend', "OK");
      }
    });
  }


  searchByTitle(searchText: string) {
    this.applyFilters();
  }
}
