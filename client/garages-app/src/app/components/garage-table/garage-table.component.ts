import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Garage } from '../../models/garage.model';

@Component({
  selector: 'app-garage-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './garage-table.component.html',
  styleUrl: './garage-table.component.css'
})
export class GarageTableComponent {
  @Input() garages: Garage[] = [];
  displayedColumns: string[] = ['name', 'city', 'address', 'profession', 'manager'];
}
