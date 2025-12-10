import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageAddButtonComponent } from './garage-add-button.component';

describe('GarageAddButtonComponent', () => {
  let component: GarageAddButtonComponent;
  let fixture: ComponentFixture<GarageAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageAddButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
