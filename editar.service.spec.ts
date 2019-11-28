import { TestBed } from '@angular/core/testing';

import { EditarService } from './editar.service';

describe('EditarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditarService = TestBed.get(EditarService);
    expect(service).toBeTruthy();
  });
});
