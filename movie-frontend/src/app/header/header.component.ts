import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {LoginToMainService} from "../login-to-main.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router,
              private checkLoginRole: LoginToMainService) {
  }
  checkUserIsAdmin():boolean {
    return this.checkLoginRole.getUserRole() === 'ADMIN';
  }

  navigateToMovies() {
    this.router.navigateByUrl('/corporate/main/movies')
  }

  ngOnInit(): void {
  }
}
