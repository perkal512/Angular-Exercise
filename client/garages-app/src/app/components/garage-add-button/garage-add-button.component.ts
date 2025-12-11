import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-garage-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule], 
  templateUrl: './garage-add-button.component.html',
  styleUrls: ['./garage-add-button.component.css'],
})
export class GarageAddButtonComponent {
  @Output() addClick = new EventEmitter<void>();

  onAddClick() {
    this.addClick.emit();
  }
}
