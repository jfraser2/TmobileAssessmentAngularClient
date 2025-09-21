import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { AlertDirective } from '../../../directives/alert-directive';
import { AddTask } from '../../../services/task/add-task';
import { AddTaskData } from '../../../models/add-task-data';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { TaskRow } from '../../../models/task-row';

@Component({
  selector: 'app-add',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
  providers: [AddTask, AlertDirective, FormGroupDirective]  
})
export class Add  implements OnInit {
	
	sectionTitle: string;
	addTaskForm: FormGroup;
	loading = false;
	appDef = AppDefaults;
	taskJavascriptData: TaskRow;
	
	@ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;	
	
	constructor(public addTaskService: AddTask, public alertDirective: AlertDirective) {
	  this.sectionTitle ="Create New Task";
	}

	ngOnInit() {
	  //       Example for the future:     dateOfBirth: new FormControl(new Date()),

	  this.addTaskForm = new FormGroup({
	    taskName: new FormControl('', [Validators.required, Validators.maxLength(55)]),
	    taskDescription: new FormControl('', [Validators.maxLength(55)]),
	    taskStatus: new FormControl('', [Validators.required, Validators.maxLength(55)])
	  });
	}
	
    public hasError = (controlName: string, errorName: string) => {
        return this.addTaskForm.controls[controlName].hasError(errorName);
    }

    private executeAddTask = (formValueObject) => {

        console.log('Add Task Name is: ' + formValueObject.taskName);

        /* the form Value Object should match the rest api call on the backend */
        /* then the conversion is very simple */
        const convertedFormValueObject = formValueObject as AddTaskData;
	//        convertedFormValueObject.regAppName = 'Starter';

	    const addTaskPromise = this.addTaskService.getAddTaskPromise(convertedFormValueObject);

        /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
        const newPromise = addTaskPromise.then((res) => {
				/* good Result res is javascript */
				this.taskJavascriptData = res.TaskEntity;

				const dialogMessage = 'Created Task: ' + this.taskJavascriptData.taskName + ' with Id: ' + this.taskJavascriptData.id;
			
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
                this.alertDirective.openDialog('Add Task', dialogMessage, 0);
                this.loading = false;
            },
            (err) => { // Error err is a javascript object
                const errMessage = this.alertDirective.errorToString(err.message);
                /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
                this.alertDirective.openDialog('Add Task Error', errMessage, 3);
                this.loading = false;
            }
        ); // end the then function


	//        this.alertDirective.underConstruction('Registration Alert');
	//        this.loading = false;

    }

    public submitFormData = (formValueObject) => {
		if (this.addTaskForm.invalid) {
			console.log('Form is invalid. Please correct errors.');
			return;
		}
		
        this.loading = true;
        this.executeAddTask(formValueObject);
    }
	
	public clearFormData = () => {
		
		this.addTaskForm.reset();
		// Reset the form group directive to mark controls as pristine/untouched
		this.formGroupDirective.resetForm(); 		
		
		return;
	}

}
