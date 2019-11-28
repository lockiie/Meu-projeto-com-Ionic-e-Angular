import { TestBed } from '@angular/core/testing';

import { EditarfuncionarioService } from './editarfuncionario.service';

describe('EditarfuncionarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditarfuncionarioService = TestBed.get(EditarfuncionarioService);
    expect(service).toBeTruthy();
  });
});
