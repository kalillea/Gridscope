import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ComponentHistoryPoint, HistoryService } from '../../services/history-chart.service';

import { EnergyComponentsService } from '../../services/energy-component.service';
import { EnergyComponent } from '../../models/energy-component.model';

@Component({
  selector: 'app-components-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ← REQUIRED for ngModel + ngModelOptions
    MatInputModule, // ← REQUIRED for matInput
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css'],
})
export class ComponentsListComponent implements OnInit {
  components: EnergyComponent[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private cdr = inject(ChangeDetectorRef);
  @Output() historySelected = new EventEmitter<ComponentHistoryPoint[]>();

  // for mat-table
  displayedColumns: string[] = ['name', 'status', 'type', 'lastUpdated', 'delete', 'history'];
  currentHistory: string[] = [];

  constructor(
    private componentsService: EnergyComponentsService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.loadComponents();
  }

  loadComponents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.componentsService.getAll().subscribe({
      next: (res) => {
        this.components = res.items as EnergyComponent[];
        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Failed to load components', err);
        this.errorMessage = 'Kunne ikke hente komponenter.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  addComponent() {
    const requestBody = {
      name: 'New component',
      status: 'inactive',
      type: 'meter',
    };

    this.componentsService.create(requestBody).subscribe({
      next: (created) => {
        this.components = [...this.components, created];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to create component:', err);
      },
    });
  }

  deleteComponent(c: any) {
    this.componentsService.delete(c.id).subscribe({
      next: () => {
        this.components = this.components.filter((x) => x.id !== c.id); // front end update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Deletion failed:', err);
      },
    });
  }

  updateComponent(c: any) {
    this.componentsService
      .update(c.id, {
        name: c.name,
        status: c.status,
        type: c.type,
      })
      .subscribe({
        next: (updated) => {
          console.log('Updated!', updated);
        },
        error: (err) => {
          console.error('Update failed:', err);
        },
      });
  }

  viewHistory(c: any) {
    this.historyService.getHistory(c.id).subscribe({
      next: (history) => {
        this.historySelected.emit(history);
      },
      error: (err) => {
        console.error('Failed to load history:', err);
        this.historySelected.emit([]);
      },
    });
  }

  save() {}
}
