import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AlertDirective } from '../../../directives/alert-directive';
import { SearchByStatusService } from '../../../services/task/search-by-status-service';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TaskRow } from '../../../models/task-row';

@Component({
  selector: 'app-display-tasks-by-status',
  imports: [CommonModule, RouterLink, MatTableModule, ScrollingModule],
  templateUrl: './display-tasks-by-status.html',
  styleUrl: './display-tasks-by-status.css',
  providers: [SearchByStatusService, AlertDirective]  
})
export class DisplayTasksByStatus implements OnInit, OnDestroy {
	
	sectionTitle: string;
	taskStatusParam: string | null = null;
	loading = false;
	appDef = AppDefaults;
	taskJsonData: string | null = null;
	paramSubscription: Subscription;
	public isLoaded : boolean =  false;	
	public totalRows : number = 0;
	matColumnDefIds : string[];
	taskJavascriptArrayData: TaskRow[];
	dataSource = new MatTableDataSource<TaskRow>();
	@ViewChild(MatSort) sort!: MatSort;		
	
	constructor(public router: Router, public currentRoute: ActivatedRoute, public searchByStatusService: SearchByStatusService, public alertDirective: AlertDirective) {
		this.matColumnDefIds = ['id', 'taskName', 'taskDescription', 'taskStatus', 'taskCreateDate']; // Define the matColumnDefIds
	}
	
	ngOnInit() {
	  this.paramSubscription = this.currentRoute.paramMap.subscribe(params => {
	    this.taskStatusParam = params.get('taskStatus');
	    // 'id' should match the parameter name defined in your route configuration
	  });
	  this.sectionTitle = "List By Task Status: " + this.taskStatusParam;
		
	  this.executeFindByStatus();
	  if (this.taskJsonData === null) {
		this.isLoaded = false;				
		this.router.navigate([{ outlets: { entirePageContent: ['app-find-by-status'] } }]);	
	  } else {
		// create an array of JavaScript objects 
		this.taskJavascriptArrayData = JSON.parse(this.taskJsonData);
		this.dataSource.data = this.taskJavascriptArrayData;
		this.totalRows = this.taskJavascriptArrayData.length;
	    this.isLoaded = true;
	  }
	}
	
	ngOnDestroy() {
	  if (this.paramSubscription) {
	    this.paramSubscription.unsubscribe();
	    console.log("Did param undescribe");
	  }
   	}
	
	ngAfterViewInit() {
	  this.dataSource.sort = this.sort;
	}	
	
	private executeFindByStatus = () => {

	    console.log('Search Task Status is: ' + this.taskStatusParam);

	    const findByStatusPromise = this.searchByStatusService.getFindByStatusPromise(this.taskStatusParam);

	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findByStatusPromise.then((res) => {
	            /* good Result */
				this.taskJsonData = res.TaskEntity;
	            this.loading = false;
	        },
	        (err) => { // Error
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('Find By Task Status Error', errMessage, 3);
				this.taskJsonData = null;
	            this.loading = false;
	        }
	    ); // end the then function


	//        this.alertDirective.underConstruction('Registration Alert');
	//        this.loading = false;

	}
	
	public trackByFn(index: number, item: TaskRow): number {
	  return item.id; // Or a unique identifier for your items
	}  	

}
