import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../user-info.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-corporate-users',
  templateUrl: './corporate-users.component.html',
  styleUrls: ['./corporate-users.component.css']
})
export class CorporateUsersComponent implements OnInit{

  allUsers: Array<any> = [];

  constructor(private userService: UserInfoService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.fetchallUsers()
      .subscribe(response => {this.allUsers= response});
  }

  fetchUsersData() {
    this.userService.fetchallUsers().subscribe(
      (response: any[]) => {
        this.allUsers = response;
      },
      (error) => {
        console.error('Error fetching users', error)
      }
    )
  }

  refreshData(){
    this.fetchUsersData();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response: any) => {
          if (response.name && response.message === "User deleted successfully") {
            this.openSnackBar(`${response.name} was deleted`, "OK");
            this.fetchUsersData();
          } else {
            this.openSnackBar("There was an error. Try again later", "OK");
          }
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
