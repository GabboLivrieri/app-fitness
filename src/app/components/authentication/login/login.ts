import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../auth/auth';
import { MaterialModule } from '../../../modules/material-module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog } from '../../dialogs/alert-dialog/alert-dialog';
import { AuthErrorService } from '../../../auth/auth-error';
import { SignupForm } from '../signup/signup';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginForm {
  isLoading = false;

  form: FormGroup;

  readonly dialog = inject(MatDialog);

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authError: AuthErrorService,
    private dialogRef: MatDialogRef<LoginForm>,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.isLoading = true;
    this.cdr.detectChanges();

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        this.userService.getById(res.localId).subscribe({
          next: (user) => {
            this.authService.setRole(user.role);
            this.isLoading = false;
            this.dialogRef.close();
            this.cdr.detectChanges();
          },
          error: () => {

            this.authService.setRole('USER');
            this.isLoading = false;
            this.dialogRef.close();
            this.cdr.detectChanges();
          }
        });
      },

      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        const data = this.authError.getError(err);
        this.dialog.open(AlertDialog, { data });
      }
    });
  }

  openSignup() {
    this.dialogRef.close();
    this.dialog.open(SignupForm, {
      width: '500px',
      disableClose: true
    });
  }

  close() {
    this.dialogRef.close();
  }
}