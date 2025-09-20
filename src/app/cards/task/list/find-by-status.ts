import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchByStatusData } from '../../../models/search-by-status-data';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf

@Component({
  selector: 'app-find-by-status',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './find-by-status.html',
  styleUrl: './find-by-status.css',
  providers: [FormGroupDirective]  
})
export class FindByStatus implements OnInit {
	
	sectionTitle: string;
	findByStatusForm: FormGroup;
	appDef = AppDefaults;
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;	

	constructor(public router: Router) {
	  this.sectionTitle = "Task Status Filter For List";
	}

	ngOnInit() {
	  this.findByStatusForm = new FormGroup({
	    taskStatus: new FormControl('', [Validators.required, Validators.maxLength(55)])
	  });
	}
	
	public hasError = (controlName: string, errorName: string) => {
	    return this.findByStatusForm.controls[controlName].hasError(errorName);
	}
	
	private 	navigateToDetails(taskStatus: string) {
	    this.router.navigate([{ outlets: { entirePageContent: ['app-display-tasks-by-status', taskStatus] } }]);	
	}
	
	public submitFormData = (formValueObject) => {
		if (this.findByStatusForm.invalid) {
			console.log('Form is invalid. Please correct errors.');
			return;
		}
		
		this.navigateToDetails(formValueObject.taskStatus);
		 
	 }

	public clearFormData = () => {
		
		this.findByStatusForm.reset();
		// Reset the form group directive to mark controls as pristine/untouched
		this.formGroupDirective.resetForm(); 		
		
		return;
	}

}
