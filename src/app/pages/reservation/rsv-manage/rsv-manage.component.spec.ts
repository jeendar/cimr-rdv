import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvManageComponent } from './rsv-manage.component';

describe('RsvManageComponent', () => {
  let component: RsvManageComponent;
  let fixture: ComponentFixture<RsvManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
