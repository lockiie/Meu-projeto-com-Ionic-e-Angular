import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadboxPage } from './cadbox.page';

describe('CadboxPage', () => {
  let component: CadboxPage;
  let fixture: ComponentFixture<CadboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
