import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AlertDirective } from '../../../directives/alert-directive';
import { SearchByStatusService } from '../../../services/task/search-by-status-service';
import { AppDefaults } from '../../../../environments/app.defaults';


@Component({
  selector: 'app-display-tasks-by-status',
  imports: [CommonModule],
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
	
	constructor(public router: Router, public currentRoute: ActivatedRoute, public searchByStatusService: SearchByStatusService, public alertDirective: AlertDirective) {
	}
	
	ngOnInit() {
	  this.paramSubscription = this.currentRoute.paramMap.subscribe(params => {
	    this.taskStatusParam = params.get('taskStatus');
	    // 'id' should match the parameter name defined in your route configuration
	  });
	  this.sectionTitle = "List By Task Status: " + this.taskStatusParam;
		
	  this.executeFindByStatus();
//      this.isLoaded = true;
	  if (this.taskJsonData === null) {
		this.router.navigate([{ outlets: { entirePageContent: ['app-find-by-status'] } }]);	
	  }
	}
	
	ngOnDestroy() {
	  if (this.paramSubscription) {
	    this.paramSubscription.unsubscribe();
	    console.log("Did param undescribe");
	  }
   	}
	
	private executeFindByStatus = () => {

	    console.log('Search Task Status is: ' + this.taskStatusParam);

	    const findByStatusPromise = this.searchByStatusService.getFindByStatusPromise(this.taskStatusParam);

	    /* then() is a function with two parameters. Each parameter is a function. Returns a brand new Promise for chaining */
	    const newPromise = findByStatusPromise.then((res) => {
	            /* good Result */
				this.taskJsonData = res.TaskEntity;
	            this.loading = false;
				this.isLoaded = true;
	        },
	        (err) => { // Error
	            const errMessage = this.alertDirective.errorToString(err.message);
	            /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	            this.alertDirective.openDialog('Find By Task Status Error', errMessage, 3);
				this.taskJsonData = null;
	            this.loading = false;
				this.isLoaded = false;				
	        }
	    ); // end the then function


	//        this.alertDirective.underConstruction('Registration Alert');
	//        this.loading = false;

	}

}
