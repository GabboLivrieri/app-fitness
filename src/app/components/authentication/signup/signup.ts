import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../auth/auth';
import { MaterialModule } from '../../../modules/material-module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog } from '../../dialogs/alert-dialog/alert-dialog';
import { AuthErrorService } from '../../../auth/auth-error';
import { LoginForm } from '../login/login';

@Component({
  selector: 'app-signup',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupForm {
  isLoading = false;

  form: FormGroup;

  readonly dialog = inject(MatDialog);

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authError: AuthErrorService,
    private dialogRef: MatDialogRef<SignupForm>
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.isLoading = true;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();

        const data = this.authError.getError(err);

        this.dialog.open(AlertDialog, { data })
      }
    });
  }

  openLogin() {
  this.dialogRef.close();
  this.dialog.open(LoginForm, {
    width: '400px',
    disableClose: true
  });
}

  close() {
    this.dialogRef.close();
  }
}