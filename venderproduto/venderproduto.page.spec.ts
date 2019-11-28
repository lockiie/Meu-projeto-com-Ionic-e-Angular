import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenderprodutoPage } from './venderproduto.page';

describe('VenderprodutoPage', () => {
  let component: VenderprodutoPage;
  let fixture: ComponentFixture<VenderprodutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderprodutoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenderprodutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
