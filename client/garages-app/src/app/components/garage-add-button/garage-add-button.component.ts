import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-garage-add-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './garage-add-button.component.html',
  styleUrls: ['./garage-add-button.component.css']
})
export class GarageAddButtonComponent {
  @Output() addClick = new EventEmitter<void>();
<<<<<<< HEAD
  onAddClick() {
    this.addClick.emit();
  }
}
=======

  onAddClick() {
    this.addClick.emit();
  }
}
>>>>>>> 87b5252a9be3de2acd5e259e18bfadb0437652f1
