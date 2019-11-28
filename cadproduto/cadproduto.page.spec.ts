import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadprodutoPage } from './cadproduto.page';

describe('CadprodutoPage', () => {
  let component: CadprodutoPage;
  let fixture: ComponentFixture<CadprodutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadprodutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadprodutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
