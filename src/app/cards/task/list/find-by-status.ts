import { Component, OnInit } from '@angular/core';
import { AppDefaults } from '../../../../environments/app.defaults';
import { AlertDirective } from '../../../directives/alert-directive';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-find-by-status',
  imports: [RouterLink, MatToolbarModule],
  templateUrl: './find-by-status.html',
  styleUrl: './find-by-status.css',
  providers: [AlertDirective]  
})
export class FindByStatus implements OnInit {
	
	appTitle: string;

	constructor(public alertDirective: AlertDirective) {
	  this.appTitle = AppDefaults.appTitle;
	}

	ngOnInit() {
	  /* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	  this.alertDirective.underConstruction('In Progress Alert');
	}

}
