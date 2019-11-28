import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadloginPage } from './cadlogin.page';

describe('CadloginPage', () => {
  let component: CadloginPage;
  let fixture: ComponentFixture<CadloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
