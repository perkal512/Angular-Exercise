import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageMultiselectComponent } from './garage-multiselect.component';

describe('GarageMultiselectComponent', () => {
  let component: GarageMultiselectComponent;
  let fixture: ComponentFixture<GarageMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageMultiselectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
