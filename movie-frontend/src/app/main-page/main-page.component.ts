import {Component, OnInit} from '@angular/core';
import {LoginToMainService} from "../login-to-main.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  constructor(private loginToMain: LoginToMainService) {
  }

  ngOnInit(): void {
  }


  isUserLoggedIn() {
    return this.loginToMain.getIsLoggedIn();
  }
}
