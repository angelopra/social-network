import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogOptions {
  icon?: string | null;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  public showConfirmButton = this.data?.showConfirmButton ?? true;
  public showCancelButton = this.data?.showCancelButton ?? true;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: ConfirmationDialogOptions,
  ) {}


}
