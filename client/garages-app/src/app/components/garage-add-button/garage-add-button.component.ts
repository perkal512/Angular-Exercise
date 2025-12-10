import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-garage-add-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `<button mat-raised-button color="primary" (click)="onAddClick()">Add Selected Garages</button>`
})
export class GarageAddButtonComponent {
  @Output() addClick = new EventEmitter<void>();
  onAddClick() { this.addClick.emit(); }
}