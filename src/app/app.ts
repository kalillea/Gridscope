import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsListComponent } from './components/component-list/components-list.component';
import { Toolbar } from './components/toolbar/toolbar.component';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';

@Component({
  selector: 'app-root',
  imports: [ComponentsListComponent, HistoryChartComponent, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gridscope');
  componentHistory = [
    { timestamp: '2025-01-01T10:00:00Z', value: 10 },
    { timestamp: '2025-01-01T11:00:00Z', value: 12 },
    { timestamp: '2025-01-01T12:00:00Z', value: 8 },
  ];
}
