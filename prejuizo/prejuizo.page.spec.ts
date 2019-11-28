import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrejuizoPage } from './prejuizo.page';

describe('PrejuizoPage', () => {
  let component: PrejuizoPage;
  let fixture: ComponentFixture<PrejuizoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrejuizoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrejuizoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
