import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "../user-info.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // @ts-ignore
  username: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  password: string;
  constructor(private router: Router, private userService: UserInfoService,
              private snackBar: MatSnackBar) {} // Inject the Router in the constructor

  onSubmit() {
    this.userService.registerUser(this.username, this.email, this.password, "USER").subscribe(
      (response: Boolean) => {
        if (response) {
          // Registration successful, show snackbar message and wait 3 seconds before navigating to '/login'
          this.openSnackBar("Registration Success!", "OK");
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 3000); // Wait 3 seconds before navigating to '/login'
        } else {
          // Login failed, show snackbar message
          this.openSnackBar("Registration failed. Please Try again later.", "OK")
        }
      },
      (error) => {
        // Handle any errors that occurred during the login request
        this.openSnackBar("An error occurred during Registration. Please Try again later.", "OK");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  goToLogin() {
    // Navigate back to the login page when the "Already have an account? Log In" button is clicked
    this.router.navigate(['/login']);
  }
}
