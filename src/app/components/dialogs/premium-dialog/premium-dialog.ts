import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../modules/material-module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-premium-dialog',
  imports: [MaterialModule],
  templateUrl: './premium-dialog.html',
  styleUrl: './premium-dialog.css',
})
export class PremiumDialog {
  readonly dialogRef = inject(MatDialogRef<PremiumDialog>);

  pay() {
    this.dialogRef.close('pay');
  }
}