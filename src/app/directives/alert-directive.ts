import { Directive } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from '../dialogs/alert-component/alert-component';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '../models/validation-errors';
import { ValidationErrorDetail } from '../models/validation-error-detail';

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
	  
	  errorToString(anError: object): string {

	      let retVar = 'Unknown Error';

	      if (null != anError) {
	          if (typeof anError === 'string') {
	              retVar = anError;
	          } else {
	              if (anError instanceof HttpErrorResponse) {
	                  const tempVar = anError as HttpErrorResponse;
	                  if (null != tempVar.message) {
	                      retVar = tempVar.message;
	                  } else {
	                      if (null != tempVar.error && null != tempVar.error.message) {
	                          retVar = tempVar.error.message;
	                      }
	                  }
	              } else { // end error Type HttpErrorResponse
	                  // looking for Validation Errors
	                  const errorList = anError as ValidationErrors;
	                  if (null != errorList.subErrors && errorList.subErrors.length > 0) {
	                      let tempReturn = 'The listed fields are NOT valid: \n';
	                      errorList.subErrors.forEach(element => {
	                          tempReturn =  tempReturn + 'Field: ' + element.field + ' Rejected Value: ' + element.rejectedValue;
	                          tempReturn = tempReturn + '\n';
	                      });
	                      retVar = tempReturn;
	                  } else {
	                      if (null != errorList.message) {
	                          retVar = errorList.message;
	                      }
	                  }
	              }
	          }
	      }

	      return retVar;
	  }
	  

}
