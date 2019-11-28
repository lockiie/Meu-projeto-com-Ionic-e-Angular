import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuncionarioPage } from './funcionario.page';

describe('FuncionarioPage', () => {
  let component: FuncionarioPage;
  let fixture: ComponentFixture<FuncionarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
