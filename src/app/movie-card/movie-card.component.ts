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

  /**
   * fetch movies from UserRegistrationService service getMovies()
   * @returns an array of all movies
   * @function getMovies
   */
  getMovies(): void {
    this.UserRegistrationService.getAllMovies().subscribe((res: any) => {
      this.movies = res;

      return this.movies;
    });
  }
  /**
   * fetch favorite movies from FetchApiDataService service getFavMovies()
   * @returns an empty array or an array of movies favorited by the user
   * @function getFavMovies
   */
  getFavMovies(): void {
    this.UserRegistrationService.getUser().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }
  /**
   * opens the GenreComponent dialog
   * @param name
   * @param description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponentComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }
  /**
   * opens the DirectorComponent dialog
   * @param name
   * @param bio
   * @param birth
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponentComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
    });
  }
  /**
   * opens the SynopsisComponent dialog
   * @param title
   * @param description
   * @function openSynopsisDialog
   */
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
