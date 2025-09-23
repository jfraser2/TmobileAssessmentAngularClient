import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AlertDirective } from '../../../directives/alert-directive';
import { SearchByStatusService } from '../../../services/task/search-by-status-service';
import { AppDefaults } from '../../../../environments/app.defaults';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ScrollingModule, CdkVirtualScrollViewport, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { TaskRow } from '../../../models/task-row';

@Component({
  selector: 'app-display-tasks-by-status',
  imports: [CommonModule, MatTableModule, ScrollingModule, CdkVirtualScrollViewport, CdkVirtualForOf, MatSortModule],
  templateUrl: './display-tasks-by-status.html',
  styleUrl: './display-tasks-by-status.css',
  providers: [SearchByStatusService, AlertDirective, MatSort]  
})
export class DisplayTasksByStatus implements OnInit, OnDestroy {
	
	sectionTitle: string;
	taskStatusParam: string | null = null;
	loading = false;
	appDef = AppDefaults;
	paramSubscription: Subscription;
	public isLoaded : boolean =  false;	
	public totalRows : number = 0;
	matColumnDefIds : string[];
	taskJavascriptArrayData: TaskRow[];
	dataSource = null;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;	
//	@ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;			
	
	constructor(public router: Router, public currentRoute: ActivatedRoute, public searchByStatusService: SearchByStatusService, public alertDirective: AlertDirective) {
		this.matColumnDefIds = ['id', 'taskName', 'taskDescription', 'taskStatus', 'taskCreateDate']; // Define the matColumnDefIds
	}
	
	async ngOnInit() {
	  this.paramSubscription = this.currentRoute.paramMap.subscribe(params => {
	    this.taskStatusParam = params.get('taskStatus');
	    // 'id' should match the parameter name defined in your route configuration
	  });
	  this.sectionTitle = "List By Task Status: " + this.taskStatusParam;
		
	  /* await makes the process act like it is synchronous, it can only be run in a async function */
	  let tempPromise = await this.executeFindByStatus();
	  if (this.taskJavascriptArrayData === null) {
		this.isLoaded = false;				
		this.router.navigate([{ outlets: { entirePageContent: ['app-find-by-status'] } }]);	
	  } else {
		console.log("Search did not have an error");
		this.dataSource = new MatTableDataSource<TaskRow>(this.taskJavascriptArrayData);
		if (null !== this.sort) {
		  this.dataSource.sort = this.sort;
	      console.log("Sort is not null");
		} else {
			console.log("Sort is null");
		}
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
	
	executeFindByStatus(): Promise<any> {

	    console.log('Search Task Status is: ' + this.taskStatusParam);

	    const findByStatusPromise = this.searchByStatusService.getFindByStatusPromise(this.taskStatusParam);
		
	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findByStatusPromise.then((res) => {
			    console.log("good result was returned: " + res);
	            /* good Result res is javascript */
				this.taskJavascriptArrayData =  res.TaskEntity;
	            this.loading = false;
	        },
	        (err) => { // Error err is a javascript object
				this.taskJavascriptArrayData =  null;
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('Find By Task Status Error', errMessage, 3);
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
