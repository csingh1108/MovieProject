import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {LoginToMainService} from "../login-to-main.service";
import {LoginresponseDto} from "../loginresponse-dto";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  // @ts-ignore
  username: string;
  // @ts-ignore
  password: string;


  constructor(private router: Router, private userService: UserInfoService,
              private loginToMain: LoginToMainService,
              private snackBar: MatSnackBar) {
  }

  onSubmit() {
    this.userService.loginUser(this.username, this.password).subscribe(
      (response: LoginresponseDto) => {
        if (response) {
          // Login successful, navigate to '/main'
          this.loginToMain.setIsLoggedIn(true);
          this.loginToMain.setUserName(this.username);
          this.loginToMain.setUserEmail(response.email);
          this.loginToMain.setUserID(response.uid);
          this.loginToMain.setUserRole(response.role)
          this.router.navigateByUrl('');
        } else {
          // Login failed, show snackbar message
          this.openSnackBar("Login failed. Please Try again later.", "OK")
        }
      },
      (error) => {
        // Handle any errors that occurred during the login request
        this.openSnackBar("An error occurred during login. Please Try again later.", "OK");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  goToRegistration() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit(): void {

  }
}
