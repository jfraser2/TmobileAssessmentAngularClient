import { Component, OnInit } from '@angular/core';
import { AlertDirective } from '../../../directives/alert-directive';

@Component({
  selector: 'app-find-by-status',
  imports: [],
  templateUrl: './find-by-status.html',
  styleUrl: './find-by-status.css',
  providers: [AlertDirective]  
})
export class FindByStatus implements OnInit {
	
	sectionTitle: string;

	constructor(public alertDirective: AlertDirective) {
	  this.sectionTitle = "List By Task Status: ";
	}

	ngOnInit() {
	  /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	  this.alertDirective.underConstruction('In Progress Alert');
	}

}
