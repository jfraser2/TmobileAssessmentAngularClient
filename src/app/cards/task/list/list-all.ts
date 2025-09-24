import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AlertDirective } from '../../../directives/alert-directive';
import { ListAllTasks } from '../../../services/task/list-all-tasks';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TaskRow } from '../../../models/task-row';

@Component({
  selector: 'app-list-all',
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './list-all.html',
  styleUrl: './list-all.css',
  providers: [ListAllTasks, AlertDirective, MatSort]  
})
export class ListAll implements OnInit, AfterViewInit {
	
	sectionTitle: string;
	loading : boolean = false;
	appDef = AppDefaults;
	public isLoaded : boolean =  false;	
	public totalRows : number = 0;
	matColumnDefIds : string[];
	taskJavascriptArrayData: TaskRow[];
	dataSource : MatTableDataSource<TaskRow> =  new MatTableDataSource<TaskRow>();
	@ViewChild(MatSort) sort!: MatSort;	
			

	constructor(public listAllTasksService: ListAllTasks, public alertDirective: AlertDirective) {
	  this.sectionTitle ="List All Tasks";
      this.matColumnDefIds = ['id', 'taskName', 'taskDescription', 'taskStatus', 'taskCreateDate']; // Define the matColumnDefIds
	}

	ngOnInit() {
  	  let tempPromise = this.executeFindAllTasks();
	}
	
	initSort() {
	  if (null !== this.dataSource && undefined !== this.dataSource) {	
	    if (null !== this.sort && undefined !== this.sort) {
	      this.dataSource.sort = this.sort;
	      console.log("Sort is not null and not undefined: " + this.sort);
	    } else {
	      console.log("Sort is null or undefined");
	    }
	  } else {
	      console.log("dataSource is null or undefined");
	  }	
	}
	
	ngAfterViewInit() {
	  this.initSort();	
	}  	

	/* a Promise execution is asynchronous */
	executeFindAllTasks(): Promise<any> {

	    const findAllTasksPromise = this.listAllTasksService.getAllTasksPromise();
		
	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findAllTasksPromise.then((res) => {
			    console.log("good result was returned: " + res);
	            /* good Result res is javascript */
				this.taskJavascriptArrayData =  res.TaskEntity;
	            this.loading = false;
				console.log("Search did not have an error");
				this.dataSource.data = this.taskJavascriptArrayData;
				this.totalRows = this.taskJavascriptArrayData.length;
				this.isLoaded = true;
	        },
	        (err) => { // Error err is a javascript object
				this.taskJavascriptArrayData =  null;
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('List All Tasks Error', errMessage, 3);
	            this.loading = false;
				console.log("Search had an Error!!!!");
				this.dataSource.data = null;
				this.totalRows = 0;
				this.isLoaded = true;
	        }
	    ); // end the then function


	//        this.alertDirective.underConstruction('Registration Alert');
	//        this.loading = false;

	    return newPromise;
	}

	public trackByFn(index: number, item: TaskRow): number {
	  return item.id; // Or a unique identifier for your items
	}  	
	
}
