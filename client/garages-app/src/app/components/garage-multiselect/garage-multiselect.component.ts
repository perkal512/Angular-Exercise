import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Garage } from '../../models/garage.model';

@Component({
  selector: 'app-garage-multiselect',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './garage-multiselect.component.html',
  styleUrl: './garage-multiselect.component.css'
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
}
