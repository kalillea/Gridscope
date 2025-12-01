import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { EnergyComponentsService } from '../../services/energy-component.service';
import { EnergyComponent } from '../../models/energy-component.model';

@Component({
  selector: 'app-components-list',
  standalone: true,
  imports: [
    CommonModule,
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

  // for mat-table
  displayedColumns: string[] = ['name', 'status', 'type', 'lastUpdated', 'delete', 'history'];

  constructor(private componentsService: EnergyComponentsService) {}

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
    const newComponent: EnergyComponent = {
      id: crypto.randomUUID(),
      name: 'New component',
      status: 'inactive',
      type: 'meter',
      lastUpdated: new Date().toISOString(),
    };

    this.components = [...this.components, newComponent];
  }

  deleteComponent(c: any) {
    this.components = this.components.filter((x) => x !== c);
  }

  updateStatus(_t33: any) {
    throw new Error('Method not implemented.');
  }

  viewHistory(_t91: any) {
    throw new Error('Method not implemented.');
  }
}
