import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementRdvComponent } from './traitement-rdv.component';

describe('TraitementRdvComponent', () => {
  let component: TraitementRdvComponent;
  let fixture: ComponentFixture<TraitementRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
