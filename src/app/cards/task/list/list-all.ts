import { Component, OnInit } from '@angular/core';
import { AppDefaults } from '../../../../environments/app.defaults';
import { AlertDirective } from '../../../directives/alert-directive';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-list-all',
  imports: [RouterLink, MatToolbarModule],
  templateUrl: './list-all.html',
  styleUrl: './list-all.css',
  providers: [AlertDirective]  
})
export class ListAll implements OnInit {
	
	appTitle: string;

	constructor(public alertDirective: AlertDirective) {
	  this.appTitle = AppDefaults.appTitle;
	}

	ngOnInit() {
	  /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	  this.alertDirective.underConstruction('In Progress Alert');
	}

}
