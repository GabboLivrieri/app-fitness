import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../auth/auth';
import { MaterialModule } from '../../../modules/material-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    public auth: Auth,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/'])
  }
}