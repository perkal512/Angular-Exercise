import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Garage } from '../../models/garage.model';

@Component({
  selector: 'app-garage-table',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, MatTableModule],
=======
  imports: [
    CommonModule,
    MatTableModule
  ],
>>>>>>> 87b5252a9be3de2acd5e259e18bfadb0437652f1
  templateUrl: './garage-table.component.html',
  styleUrls: ['./garage-table.component.css']
})
export class GarageTableComponent {
  @Input() garages: Garage[] = [];
  displayedColumns: string[] = ['name', 'city', 'address', 'profession', 'manager'];
<<<<<<< HEAD
}
=======
}
>>>>>>> 87b5252a9be3de2acd5e259e18bfadb0437652f1
