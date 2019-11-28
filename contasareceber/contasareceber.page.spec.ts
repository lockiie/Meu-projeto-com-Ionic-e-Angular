import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContasareceberPage } from './contasareceber.page';

describe('ContasareceberPage', () => {
  let component: ContasareceberPage;
  let fixture: ComponentFixture<ContasareceberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasareceberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContasareceberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
