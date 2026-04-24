import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../auth/auth';
import { MaterialModule } from '../../../modules/material-module';
import { MatDialog } from '@angular/material/dialog';
import { LoginForm } from '../../authentication/login/login';
import { SignupForm } from '../../authentication/signup/signup';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  constructor(
    public authService: Auth,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cdr.detectChanges();
      }
    });
  }

  openLogin() {
    this.dialog.open(LoginForm, {
      width: '500px',
      disableClose: true
    });
  }

  openSignup() {
    this.dialog.open(SignupForm, {
      width: '500px',
      disableClose: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAuth() {
    return this.authService.isLogged();
  }
}