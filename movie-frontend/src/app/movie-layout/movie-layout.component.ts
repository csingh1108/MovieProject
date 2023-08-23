import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../user-info.service";
import {MovieInfoService} from "../movie-info.service";

@Component({
  selector: 'app-movie-layout',
  templateUrl: './movie-layout.component.html',
  styleUrls: ['./movie-layout.component.css']
})
export class MovieLayoutComponent implements OnInit{

  allMovies: Array<any> = [];

  constructor(private movieService: MovieInfoService) {
  }

  ngOnInit(): void {
    this.movieService.getEnabledMovies()
      .subscribe(response => {this.allMovies= response;
      })
  }



}
