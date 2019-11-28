import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadprejuizoPage } from './cadprejuizo.page';

describe('CadprejuizoPage', () => {
  let component: CadprejuizoPage;
  let fixture: ComponentFixture<CadprejuizoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadprejuizoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadprejuizoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
