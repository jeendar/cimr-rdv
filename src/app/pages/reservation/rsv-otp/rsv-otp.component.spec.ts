import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvOtpComponent } from './rsv-otp.component';

describe('RsvOtpComponent', () => {
  let component: RsvOtpComponent;
  let fixture: ComponentFixture<RsvOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
