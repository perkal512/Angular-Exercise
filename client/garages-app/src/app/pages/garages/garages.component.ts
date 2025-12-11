import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GarageMultiselectComponent } from '../../components/garage-multiselect/garage-multiselect.component';
import { GarageTableComponent } from '../../components/garage-table/garage-table.component';
import { GaragesStateService } from '../../services/garages-state-service.service';
import { GarageAddButtonComponent } from '../../components/garage-add-button/garage-add-button.component';

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    GarageMultiselectComponent,
    GarageTableComponent,
    GarageAddButtonComponent],
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
    try {
      await this.state.loadLocalGarages();
      await this.state.loadGovGarages();
    } catch (err) {
      this.snackBar.open('Error loading garages', 'Close', { duration: 4000 });
    }
    this.loading = false;

  }

  async addSelectedGarages() {
    this.loading = true;
    try {
      const resp = await this.state.addSelectedGarages();
       const msg = resp.message ??
      `${resp.added?.length ?? 0} added, ${resp.notAdded?.length ?? 0} skipped`;

    this.snackBar.open(msg, 'Close', { duration: 3500 });
    } catch (err) {
      this.snackBar.open('Failed to add garages', 'Close', { duration: 3500 });
    } finally {
      this.loading = false;
    }
  }

}