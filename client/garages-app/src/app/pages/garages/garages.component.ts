import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GaragesService } from '../../services/garages.service';
import { Garage } from '../../models/garage.model';
import { GarageMultiselectComponent } from '../../components/garage-multiselect/garage-multiselect.component';
import { GarageTableComponent } from '../../components/garage-table/garage-table.component';
import { GarageAddButtonComponent } from '../../components/garage-add-button/garage-add-button.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    GarageMultiselectComponent,
    GarageTableComponent,
    GarageAddButtonComponent
  ],
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css'],
  providers: [GaragesService]
})
export class GaragesComponent implements OnInit {
  allGovGarages: Garage[] = [];
  localGarages: Garage[] = [];
  selectedGarages: Garage[] = [];
  loading: boolean = false;

  constructor(
    private garagesService: GaragesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchLocalGarages();
    this.fetchGovernmentGarages();
  }

  fetchLocalGarages() {
    this.loading = true;
    this.garagesService.getLocalGarages()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: garages => this.localGarages = garages,
        error: err => {
          console.error('Failed to fetch local garages', err);
          this.snackBar.open('Failed to fetch local garages', 'Close', { duration: 5000 });
        }
      });
  }

  fetchGovernmentGarages() {
    this.garagesService.getFromGovernment()
      .subscribe({
        next: garages => this.allGovGarages = garages,
        error: err => {
          console.error('Failed to fetch government garages', err);
          this.snackBar.open('Failed to fetch government garages', 'Close', { duration: 5000 });
        }
      });
  }

  onSelectionChange(event: any) {
    console.log('Selected garages:', this.selectedGarages);
  }

  addSelectedGarages() {
    const garagesToAdd = this.selectedGarages.filter(g => 
      !this.localGarages.some(lg => lg.externalId === g.externalId)
    );

    if (garagesToAdd.length === 0) {
      this.snackBar.open('No new garages selected', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.garagesService.addMultipleGarages(garagesToAdd)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: added => {
          this.localGarages = [...this.localGarages, ...added];
          this.selectedGarages = [];
          this.snackBar.open(`${added.length} garage(s) added successfully!`, 'Close', { duration: 3000 });
        },
        error: err => {
          console.error('Failed to add garages', err);
          this.snackBar.open('Failed to add garages', 'Close', { duration: 5000 });
        }
      });
  }
}