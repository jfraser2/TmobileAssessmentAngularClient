import { Component, OnInit } from '@angular/core';
import { AlertDirective } from '../../../directives/alert-directive';

@Component({
  selector: 'app-list-all',
  imports: [],
  templateUrl: './list-all.html',
  styleUrl: './list-all.css',
  providers: [AlertDirective]  
})
export class ListAll implements OnInit {
	
	sectionTitle: string;

	constructor(public alertDirective: AlertDirective) {
	  this.sectionTitle ="List All Tasks";
	}

	ngOnInit() {
	  /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	  this.alertDirective.underConstruction('In Progress Alert');
	}

}
