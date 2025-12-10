import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-garage-add-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './garage-add-button.component.html',
  styleUrl: './garage-add-button.component.css'
})
export class GarageAddButtonComponent {
  @Output() addClick = new EventEmitter<void>();

  onAddClick() {
    this.addClick.emit();
  }
}
