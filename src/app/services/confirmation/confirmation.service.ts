import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogOptions } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  fire(action: () => void, options?: ConfirmationDialogOptions) {
    this.dialog.open(ConfirmationDialogComponent, { data: options }).afterClosed().subscribe((res?: boolean) => {
      if (res) {
        action();
      }
    });
  }
}
