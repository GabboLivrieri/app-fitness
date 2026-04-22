import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginForm } from '../../components/authentication/login/login';
import { SignupForm } from '../../components/authentication/signup/signup';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private dialog: MatDialog) {}

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
}
