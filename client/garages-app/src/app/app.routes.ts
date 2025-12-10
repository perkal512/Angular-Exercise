import { Routes } from '@angular/router';
import { GaragesComponent } from './pages/garages/garages.component';

export const routes: Routes = [
    { path: '', component: GaragesComponent },
    { path: 'garages', component: GaragesComponent }
];