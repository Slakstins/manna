import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressValEditComponent } from './address-val-edit.component';

describe('AddressValEditComponent', () => {
  let component: AddressValEditComponent;
  let fixture: ComponentFixture<AddressValEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressValEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressValEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
