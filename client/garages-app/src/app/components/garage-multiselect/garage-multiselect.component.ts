import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GaragesStateService } from '../../services/garages-state-service.service';
import { Garage } from '../../models/garage.model';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

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
  styleUrls: ['./garage-multiselect.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5px)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-5px)' }))
      ])
    ])
  ]
})
export class GarageMultiselectComponent {
  govGarages$: Observable<Garage[]> = this.state.govGarages$;
  selectedGarages$: Observable<Garage[]> = this.state.selectedGarages$;

  constructor(private state: GaragesStateService) {}

  onSelectionChange(selected: Garage[]) {
    this.state.selectGarages(selected);
  }
}
