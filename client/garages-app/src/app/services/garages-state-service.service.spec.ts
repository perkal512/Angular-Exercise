import { TestBed } from '@angular/core/testing';

import { GaragesStateServiceService } from './garages-state-service.service';

describe('GaragesStateServiceService', () => {
  let service: GaragesStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaragesStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
