import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListvendasPage } from './listvendas.page';

describe('ListvendasPage', () => {
  let component: ListvendasPage;
  let fixture: ComponentFixture<ListvendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvendasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListvendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
