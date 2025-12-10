import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { GaragesStateService } from '../../services/garages-state-service.service';
import { Garage } from '../../models/garage.model';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-garage-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './garage-table.component.html',
  styleUrls: ['./garage-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ])
  ]
})
export class GarageTableComponent implements AfterViewInit {
  displayedColumns = ['misparMosah', 'name', 'address', 'profession', 'manager'];
  dataSource = new MatTableDataSource<Garage>([]);
  localGarages$: Observable<Garage[]> = this.state.localGarages$;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private state: GaragesStateService) { }


  ngOnInit(): void {
    this.localGarages$.subscribe(garages => {
      this.dataSource.data = garages;

      Promise.resolve().then(() => {
        if (this.paginator) {
          this.paginator._changePageSize(this.paginator.pageSize);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}