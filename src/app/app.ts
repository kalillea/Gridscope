import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsListComponent } from './components/component-list/components-list.component';
import { Toolbar } from './components/toolbar/toolbar.component';
import { AsyncPipe } from '@angular/common';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentHistoryPoint } from './services/history-chart.service';

@Component({
  selector: 'app-root',
  imports: [ComponentsListComponent, HistoryChartComponent, Toolbar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gridscope');

  history$ = new BehaviorSubject<ComponentHistoryPoint[]>([]);

  // Method for child to call
  setHistory(history: ComponentHistoryPoint[]) {
    this.history$.next(history);
  }
  /* componentHistory = [
    { timestamp: '2021-01-01T12:00:00Z', value: 1 },
    { timestamp: '2022-01-01T12:00:00Z', value: 1 },
    { timestamp: '2023-01-01T10:00:00Z', value: 10 },
    { timestamp: '2024-01-01T11:00:00Z', value: 12 },
    { timestamp: '2025-01-01T12:00:00Z', value: 8 },
  ]; */
}
