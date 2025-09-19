import { Component, OnInit } from '@angular/core';
import { AppDefaults } from '../../../environments/app.defaults';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-main-dashboard',
  imports: [RouterLink, RouterOutlet, MatToolbarModule],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css'
})
export class MainDashboard  implements OnInit {

  appTitle: string;

  constructor(public router: Router) {
    this.appTitle = AppDefaults.appTitle;
  }

  ngOnInit() {
	this.router.navigate([{ outlets: { entirePageContent: ['app-add'] } }]);	
  }
  
}
