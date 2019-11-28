import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoxPage } from './box.page';

describe('BoxPage', () => {
  let component: BoxPage;
  let fixture: ComponentFixture<BoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
