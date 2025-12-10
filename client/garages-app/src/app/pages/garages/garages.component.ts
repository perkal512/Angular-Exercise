import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GarageMultiselectComponent } from '../../components/garage-multiselect/garage-multiselect.component';
import { GarageTableComponent } from '../../components/garage-table/garage-table.component';
import { GaragesStateService } from '../../services/garages-state-service.service';

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule,
    GarageMultiselectComponent, GarageTableComponent],
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {
  loading = false;

  constructor(private state: GaragesStateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadAll();
  }

  async loadAll() {
    this.loading = true;

    const local = await this.state.loadLocalGarages();
    const gov = await this.state.loadGovGarages();
    if (!local.ok)
      this.snackBar.open(local.message, 'סגור', { duration: 4000 });

    if (!gov.ok)
      this.snackBar.open(gov.message, 'סגור', { duration: 4000 });

    this.loading = false;
  }

  async addSelectedGarages() {
    this.loading = true;
    try {
      const resp = await this.state.addSelectedGarages();
      this.snackBar.open(resp.message ?? `${resp.added.length} added, ${resp.notAdded.length} skipped`, 'Close', { duration: 3500 });
    } catch (err) {
      this.snackBar.open('Failed to add garages', 'Close', { duration: 3500 });
    } finally {
      this.loading = false;
    }
  }
}