import { Directive } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from '../dialogs/alert-component/alert-component';
import { HttpErrorResponse } from '@angular/common/http';

@Directive({
  selector: '[appAlertDirective]'
})
export class AlertDirective {

  constructor(public dialog: MatDialog) { }
      /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
      openDialog(aMessageTitle: string, aMessage: string, aStatus: number) {

          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = false;
          dialogConfig.hasBackdrop = true;
          dialogConfig.data = {
              messageText: aMessage,
              messageTitle: aMessageTitle,
              messageStatus: aStatus
          };

          const dialogRef = this.dialog.open(AlertComponent, dialogConfig);
  /*
          dialogRef.afterClosed().subscribe(
              data => console.log('Dialog output:', data)
          );
  */

          return dialogRef;
      }

      underConstruction(aMessageTitle: string) {
          /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
          const dialogRef = this.openDialog(aMessageTitle, 'Under Construction', 2);

          return dialogRef;
      }

}
