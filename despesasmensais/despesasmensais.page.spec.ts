import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DespesasmensaisPage } from './despesasmensais.page';

describe('DespesasmensaisPage', () => {
  let component: DespesasmensaisPage;
  let fixture: ComponentFixture<DespesasmensaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesasmensaisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DespesasmensaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
