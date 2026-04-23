import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginForm } from '../../components/authentication/login/login';
import { SignupForm } from '../../components/authentication/signup/signup';
import { RouterLink } from "@angular/router";
import { Auth } from '../../auth/auth';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class Home {

  isAuth = false;

  constructor(private dialog: MatDialog, private auth: Auth) {
    this.isAuth = this.auth.isLogged();
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



  
}
