import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainDashboard } from './dashboards/main-dashboard/main-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('T-Mobile Assessment Angular Client');
}
