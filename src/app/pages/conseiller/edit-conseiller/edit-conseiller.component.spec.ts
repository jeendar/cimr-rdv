import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconseillerComponent } from './edit-conseiller.component';

describe('EditConseillerComponent', () => {
  let component: EditconseillerComponent;
  let fixture: ComponentFixture<EditconseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditconseillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditconseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
