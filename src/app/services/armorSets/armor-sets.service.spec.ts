import { TestBed } from '@angular/core/testing';

import { ArmorSetsService } from './armor-sets.service';

describe('ArmorSetsService', () => {
  let service: ArmorSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
