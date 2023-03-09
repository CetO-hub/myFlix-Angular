import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; //Display notification

import { DirectorComponentComponent } from '../director-component/director-component.component';
import { GenreComponentComponent } from '../genre-component/genre-component.component';
import { SynopsisComponentComponent } from '../synopsis-component/synopsis-component.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public UserRegistrationService: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getMovies(): void {
    this.UserRegistrationService.getAllMovies().subscribe((res: any) => {
      this.movies = res;

      return this.movies;
    });
  }

  getFavMovies(): void {
    this.UserRegistrationService.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponentComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponentComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponentComponent, {
      data: {
        Name: title,
        Description: description,
      },
    });
  }

  onToggleFavMovie(id: string): void {
    if (!this.favoriteMovies.includes(id)) {
      this.UserRegistrationService.addFavoriteMovie(id).subscribe(
        (res) => {
          this.favoriteMovies = res.FavoriteMovies;
          this.snackBar.open('Movie added to favourites.', 'OK', {
            duration: 3000,
          });
        },
        (res) => {
          this.snackBar.open(res.message, 'OK', {
            duration: 4000,
          });
        }
      );
    } else {
      this.UserRegistrationService.removeFavoriteMovie(id).subscribe(
        (res) => {
          this.favoriteMovies = res.FavoriteMovies;
          this.snackBar.open('Movie removed from favourites.', 'OK', {
            duration: 3000,
          });
        },
        (res) => {
          this.snackBar.open(res.message, 'OK', {
            duration: 4000,
          });
        }
      );
    }
  }
}
