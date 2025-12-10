import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GaragesComponent } from './pages/garages/garages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GaragesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'garages-app';
}
