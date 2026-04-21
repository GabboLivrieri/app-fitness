import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../modules/material-module';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef,
 } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  imports: [MaterialModule],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialog {
  readonly dialogRef = inject(MatDialogRef<AlertDialog>);
  readonly data = inject<{ title: string; message: string }>(MAT_DIALOG_DATA);
}

