import { Routes } from "@angular/router";
import { MainDashboard } from './dashboards/main-dashboard/main-dashboard';

export const routes: Routes = [
 { path: '', redirectTo: '/', pathMatch: 'full' },
 {
    path: 'app-main-dashboard',
    component: MainDashboard
  }
];