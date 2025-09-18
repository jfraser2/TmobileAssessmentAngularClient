import { Routes } from "@angular/router";
import { App } from './app';
import { MainDashboard } from './dashboards/main-dashboard/main-dashboard';
import { FindByStatus } from './cards/task/list/find-by-status';
import { ListAll } from './cards/task/list/list-all';

export const routes: Routes = [
  {
    path: 'app-main-dashboard',
    component: MainDashboard
  },
  {
    path: 'app-find-by-status',
    component: FindByStatus
  },
  {
    path: 'app-list-all',
    component:  ListAll
  },
  {
    path: 'app-root',
    component: App
  }
];