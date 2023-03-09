import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-component',
  templateUrl: './synopsis-component.component.html',
  styleUrls: ['./synopsis-component.component.scss'],
})
export class SynopsisComponentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
}
