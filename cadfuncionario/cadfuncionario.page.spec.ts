import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadfuncionarioPage } from './cadfuncionario.page';

describe('CadfuncionarioPage', () => {
  let component: CadfuncionarioPage;
  let fixture: ComponentFixture<CadfuncionarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadfuncionarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadfuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
