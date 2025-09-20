import { Routes } from "@angular/router";
import { App } from './app';
import { MainDashboard } from './dashboards/main-dashboard/main-dashboard';
import { FindByStatus } from './cards/task/list/find-by-status';
import { DisplayTasksByStatus } from './cards/task/list/display-tasks-by-status';
import { ListAll } from './cards/task/list/list-all';
import { Add } from './cards/task/add/add';

export const routes: Routes = [
  {
    path: 'app-main-dashboard',
    component: MainDashboard
  },
  {
    path: 'app-add',
    component:  Add,
	outlet: 'entirePageContent' 	
  },
  {
    path: 'app-find-by-status',
    component: FindByStatus,
	outlet: 'entirePageContent' 	
  },
  {
    path: 'app-display-tasks-by-status/:taskStatus',
    component: DisplayTasksByStatus,
    outlet: 'entirePageContent' 	
  },
  {
    path: 'app-list-all',
    component:  ListAll,
	outlet: 'entirePageContent' 	
  },
  {
    path: 'app-root',
    component: App
  }
];