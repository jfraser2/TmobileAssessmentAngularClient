import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { AlertDirective } from '../../../directives/alert-directive';
import { SearchByStatusService } from '../../../services/task/search-by-status-service';
import { SearchByStatusData } from '../../../models/search-by-status-data';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-find-by-status',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './find-by-status.html',
  styleUrl: './find-by-status.css',
  providers: [SearchByStatusService, AlertDirective, FormGroupDirective]  
})
export class FindByStatus implements OnInit {
	
	sectionTitle: string;
	findByStatusForm: FormGroup;
	loading = false;
	appDef = AppDefaults;
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;	

	constructor(public searchByStatusService: SearchByStatusService, public alertDirective: AlertDirective) {
	  this.sectionTitle = "List By Task Status: ";
	}

	ngOnInit() {
	  this.findByStatusForm = new FormGroup({
	    taskStatus: new FormControl('', [Validators.required, Validators.maxLength(55)])
	  });
	}
	
	public hasError = (controlName: string, errorName: string) => {
	    return this.findByStatusForm.controls[controlName].hasError(errorName);
	}
	
	private executeFindByStatus = (formValueObject) => {

	    console.log('Search Task Status is: ' + formValueObject.taskStatus);

	    /* the form Value Object should match the rest api call on the backend */
	    /* then the conversion is very simple */
	    const convertedFormValueObject = formValueObject as SearchByStatusData;
	//        convertedFormValueObject.regAppName = 'Starter';

	    const findByStatusPromise = this.searchByStatusService.getFindByStatusPromise(convertedFormValueObject);

	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findByStatusPromise.then((res) => {
	                /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            const dialogMessage = res.message;
	            this.alertDirective.openDialog('Find By Task Status', dialogMessage, 0);
	            this.loading = false;
	        },
	        (err) => { // Error
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('Find By Task Status Error', errMessage, 3);
	            this.loading = false;
	        }
	    ); // end the then function


	//        this.alertDirective.underConstruction('Registration Alert');
	//        this.loading = false;

	}
	
	public submitFormData = (formValueObject) => {
		if (this.findByStatusForm.invalid) {
			console.log('Form is invalid. Please correct errors.');
			return;
		}
		
	     this.loading = true;
	     this.executeFindByStatus(formValueObject);
	 }

	public clearFormData = () => {
		
		this.findByStatusForm.reset();
		// Reset the form group directive to mark controls as pristine/untouched
		this.formGroupDirective.resetForm(); 		
		
		return;
	}

}
