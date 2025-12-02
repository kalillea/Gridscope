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
  styleUrl: './history-chart.component.css',
})
export class HistoryChartComponent implements OnChanges {
  @Input() history: { timestamp: string; value: number }[] | null = [];

  public chartType: ChartType = 'line';

  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Status',
        data: [],
        borderWidth: 2,
        tension: 0,
      },
    ],
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  ngOnInit() {}

  ngOnChanges(): void {
    console.log(this.history);
    if (!this.history || this.history.length === 0) return;

    this.chartData = {
      labels: this.history.map((h) => new Date(h.timestamp).toLocaleDateString()),

      datasets: [
        {
          label: 'Energiforbruk (KWh)',
          data: this.history.map((h) => h.value),
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    };
  }
}
