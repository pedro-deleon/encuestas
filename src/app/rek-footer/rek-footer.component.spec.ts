import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekFooterComponent } from './rek-footer.component';

describe('RekFooterComponent', () => {
  let component: RekFooterComponent;
  let fixture: ComponentFixture<RekFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
