import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaddespesasPage } from './caddespesas.page';

describe('CaddespesasPage', () => {
  let component: CaddespesasPage;
  let fixture: ComponentFixture<CaddespesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaddespesasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaddespesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
