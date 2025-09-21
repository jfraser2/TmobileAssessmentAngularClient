import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AlertDirective } from '../../../directives/alert-directive';
import { ListAllTasks } from '../../../services/task/list-all-tasks';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TaskRow } from '../../../models/task-row';

@Component({
  selector: 'app-list-all',
  imports: [CommonModule, MatTableModule, ScrollingModule, MatPaginatorModule],
  templateUrl: './list-all.html',
  styleUrl: './list-all.css',
  providers: [ListAllTasks, AlertDirective]  
})
export class ListAll implements OnInit {
	
	sectionTitle: string;
	loading = false;
	appDef = AppDefaults;
	public isLoaded : boolean =  false;	
	public totalRows : number = 0;
	matColumnDefIds : string[];
	taskJavascriptArrayData: TaskRow[];
	dataSource = null;
	@ViewChild(MatSort) sort!: MatSort;		

	constructor(public listAllTasksService: ListAllTasks, public alertDirective: AlertDirective) {
	  this.sectionTitle ="List All Tasks";
      this.matColumnDefIds = ['id', 'taskName', 'taskDescription', 'taskStatus', 'taskCreateDate']; // Define the matColumnDefIds
	}

	async ngOnInit() {
	/* await makes the proess act like it is synchronous, it can only be run in a async function  */
  	  let tempPromise = await this.executeFindAllTasks();
  	  if (this.taskJavascriptArrayData === null) {
		console.log("Search had an Error!!!!");
		this.totalRows = 0;
		this.dataSource = new MatTableDataSource<TaskRow>();
		this.dataSource.sort = this.sort;
		this.isLoaded = true;
  	  } else {
  		console.log("Search did not have an error");
  		this.dataSource = new MatTableDataSource<TaskRow>(this.taskJavascriptArrayData);
  		this.dataSource.sort = this.sort;
  		this.totalRows = this.taskJavascriptArrayData.length;
  	    this.isLoaded = true;
  	  }
	  
	}

	executeFindAllTasks(): Promise<any> {

	    const findAllTasksPromise = this.listAllTasksService.getAllTasksPromise();
		
	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findAllTasksPromise.then((res) => {
			    console.log("good result was returned: " + res);
	            /* good Result res is javascript */
				this.taskJavascriptArrayData =  res.TaskEntity;
	            this.loading = false;
	        },
	        (err) => { // Error err is a javascript object
				this.taskJavascriptArrayData =  null;
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('List All Tasks Error', errMessage, 3);
	            this.loading = false;
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
