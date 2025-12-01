import { Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-history-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './history-chart.component.html',
})
export class HistoryChartComponent implements OnChanges {
  @Input() history: { timestamp: string; value: number }[] = [];

  public chartType: ChartType = 'line';

  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Status',
        data: [],
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  ngOnChanges(): void {
    if (!this.history || this.history.length === 0) return;

    this.chartData.labels = this.history.map((h) => new Date(h.timestamp).toLocaleTimeString());

    this.chartData.datasets[0].data = this.history.map((h) => h.value);
  }
}
