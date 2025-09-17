import { Component, OnInit } from '@angular/core';
import { AppDefaults } from '../../../environments/app.defaults';
import { AlertDirective } from '../../directives/alert-directive';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-main-dashboard',
  imports: [RouterOutlet],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css',
  providers: [AlertDirective]  
})
export class MainDashboard  implements OnInit {

  appTitle: string;

  constructor(public alertDirective: AlertDirective) {
    this.appTitle = AppDefaults.appTitle;
  }

  ngOnInit() {
	/* status values: 0 - green, 1 - yellow, 2 - alert, 3 or more - red */
	this.alertDirective.underConstruction('In Progress Alert');
  }
  
}
