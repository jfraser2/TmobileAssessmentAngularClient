import { Routes } from "@angular/router";
import { App } from './app';
import { MainDashboard } from './dashboards/main-dashboard/main-dashboard';

export const routes: Routes = [
 {
    path: 'app-main-dashboard',
    component: MainDashboard
  },
  {
     path: 'app-root',
     component: App
   },
];