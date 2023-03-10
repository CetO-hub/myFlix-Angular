import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(public router: Router) {}

  /**
   * clear localStorage when user clicks on logout in the navBar
   * @function logout()
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
