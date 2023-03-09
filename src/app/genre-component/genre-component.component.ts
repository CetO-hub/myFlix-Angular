import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-component',
  templateUrl: './genre-component.component.html',
  styleUrls: ['./genre-component.component.scss'],
})
export class GenreComponentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
}
