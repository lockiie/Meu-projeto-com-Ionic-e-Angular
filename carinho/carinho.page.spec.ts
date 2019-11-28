import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarinhoPage } from './carinho.page';

describe('CarinhoPage', () => {
  let component: CarinhoPage;
  let fixture: ComponentFixture<CarinhoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarinhoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarinhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
