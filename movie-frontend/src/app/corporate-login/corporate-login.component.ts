import { Component } from '@angular/core';
import {LoginresponseDto} from "../loginresponse-dto";
import {LoginToMainService} from "../login-to-main.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../user-info.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-corporate-login',
  templateUrl: './corporate-login.component.html',
  styleUrls: ['./corporate-login.component.css']
})
export class CorporateLoginComponent {

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
          // Login successful, navigate to '/corporatemain'
          this.loginToMain.setIsLoggedIn(true);
          this.loginToMain.setUserName(this.username);
          this.loginToMain.setUserEmail(response.email);
          this.loginToMain.setUserID(response.uid);
          this.loginToMain.setUserRole(response.role)
          if(response.role == "ADMIN"){
            this.router.navigateByUrl('corporate/main');
          }else{
            this.openSnackBar("Not authorized to login here.", "OK")
          }

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


  ngOnInit(): void {

  }
}
