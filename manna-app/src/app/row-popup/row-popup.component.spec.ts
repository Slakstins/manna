import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPopupComponent } from './row-popup.component';

describe('AddressPopupComponent', () => {
  let component: RowPopupComponent;
  let fixture: ComponentFixture<RowPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
