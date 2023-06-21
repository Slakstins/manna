import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNavComponent } from './driver-nav.component';

describe('DriverNavComponent', () => {
  let component: DriverNavComponent;
  let fixture: ComponentFixture<DriverNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
