import { TestBed } from '@angular/core/testing';

import { InbalanceService } from './inbalance.service';

describe('InbalanceService', () => {
  let service: InbalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InbalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
