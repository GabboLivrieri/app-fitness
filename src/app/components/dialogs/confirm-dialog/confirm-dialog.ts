import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../modules/material-module';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MaterialModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<{title: string, message: string }>(MAT_DIALOG_DATA);

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
