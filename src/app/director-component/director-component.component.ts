import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-component',
  templateUrl: './director-component.component.html',
  styleUrls: ['./director-component.component.scss'],
})
export class DirectorComponentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}
}
