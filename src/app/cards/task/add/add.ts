import { Component, OnInit } from '@angular/core';
import { AlertDirective } from '../../../directives/alert-directive';

@Component({
  selector: 'app-add',
  imports: [],
  templateUrl: './add.html',
  styleUrl: './add.css',
  providers: [AlertDirective]  
})
export class Add  implements OnInit {
	
	sectionTitle: string;
	
	constructor(public alertDirective: AlertDirective) {
	  this.sectionTitle ="Create New Task";
	}

	ngOnInit() {
	  /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	  this.alertDirective.underConstruction('In Progress Alert');
	}

}
