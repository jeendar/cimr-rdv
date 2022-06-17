import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvConseillerComponent } from './rdv-conseiller.component';

describe('RdvConseillerComponent', () => {
  let component: RdvConseillerComponent;
  let fixture: ComponentFixture<RdvConseillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvConseillerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvConseillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
