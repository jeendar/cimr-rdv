import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportHolidaysComponent } from './import-holidays.component';

describe('ImportHolidaysComponent', () => {
  let component: ImportHolidaysComponent;
  let fixture: ComponentFixture<ImportHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
