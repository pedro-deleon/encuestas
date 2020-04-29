import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEncuestasComponent } from './menu-encuestas.component';

describe('MenuEncuestasComponent', () => {
  let component: MenuEncuestasComponent;
  let fixture: ComponentFixture<MenuEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
