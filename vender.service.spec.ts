import { TestBed } from '@angular/core/testing';

import { VenderService } from './vender.service';

describe('VenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenderService = TestBed.get(VenderService);
    expect(service).toBeTruthy();
  });
});
