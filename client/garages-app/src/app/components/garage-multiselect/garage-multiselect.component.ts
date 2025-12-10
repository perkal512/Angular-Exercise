import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Garage } from '../../models/garage.model';

@Component({
  selector: 'app-garage-multiselect',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
=======
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
>>>>>>> 87b5252a9be3de2acd5e259e18bfadb0437652f1
  templateUrl: './garage-multiselect.component.html',
  styleUrls: ['./garage-multiselect.component.css']
})
export class GarageMultiselectComponent {
  @Input() garages: Garage[] = [];
  @Input() selectedGarages: Garage[] = [];
  @Output() selectedGaragesChange = new EventEmitter<Garage[]>();
  @Output() selectionChange = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectedGaragesChange.emit(this.selectedGarages);
    this.selectionChange.emit(event);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 87b5252a9be3de2acd5e259e18bfadb0437652f1
