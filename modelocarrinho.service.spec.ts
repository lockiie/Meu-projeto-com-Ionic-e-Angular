import { TestBed } from '@angular/core/testing';

import { ModelocarrinhoService } from './modelocarrinho.service';

describe('ModelocarrinhoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelocarrinhoService = TestBed.get(ModelocarrinhoService);
    expect(service).toBeTruthy();
  });
});
