import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPaComponent } from './angular-pa.component';

describe('AngularPaComponent', () => {
  let component: AngularPaComponent;
  let fixture: ComponentFixture<AngularPaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
