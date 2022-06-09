import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvRecapComponent } from './rsv-recap.component';

describe('RsvRecapComponent', () => {
  let component: RsvRecapComponent;
  let fixture: ComponentFixture<RsvRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
