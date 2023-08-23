import {Component, Input, OnInit} from '@angular/core';
import {MovieDto} from "../movie-dto";
import {Router, NavigationExtras} from "@angular/router";


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit{

  @Input()
  movie!: MovieDto;

    constructor(private router: Router) {

    }

    ngOnInit(): void {
    }

    onBuyTicket(movie: MovieDto) {
      const details :NavigationExtras= {
        state: {
        movieData:movie}
      }
      this.router.navigate(['movies', movie.title], details);
    }
}
