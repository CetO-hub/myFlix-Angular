import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  @Input() userUpdateData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public userRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * When component mounts get user information from backend by calling getUserInfo()
   */
  ngOnInit(): void {
    this.getUserInfo();
  }
  /**
   * Get user information from backend
   * @function getUserInfo()
   * @returns user array with respective information
   */
  getUserInfo(): void {
    this.userRegistrationService.getUser().subscribe((res: any) => {
      this.user = {
        ...res,
        Birthday: new Date(res.Birthday).toLocaleDateString(),
      };
      console.log('getUserInfo():', this.user);
      return this.user;
    });
  }
  /**
   * Delete user account after user confirmation
   * @function onDeleteAccount()
   */
  onDeleteAccount(username: string): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannnot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open(
          'You have successfully deleted your account!',
          'OK',
          {
            duration: 3000,
          }
        );
      });
    }

    this.userRegistrationService.deleteUser().subscribe((res) => {
      console.log('deleteAccountRes:', res);
    });
  }
  /**
   * Update user information
   * @function onUserUpdate()
   */
  onUserUpdate(): void {
    this.userRegistrationService
      .editUser(this.userUpdateData, this.user._id)
      .subscribe(
        (response) => {
          localStorage.setItem('user', response.Username);
          this.snackBar.open('Your profile is updated successfully!', 'OK', {
            duration: 4000,
          });

          window.location.reload();
        },
        (response) => {
          this.snackBar.open(response.errors[0].msg, 'OK', {
            duration: 6000,
          });
        }
      );
  }
}
