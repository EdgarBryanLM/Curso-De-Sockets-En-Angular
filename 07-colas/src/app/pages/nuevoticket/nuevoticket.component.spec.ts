import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoticketComponent } from './nuevoticket.component';

describe('NuevoticketComponent', () => {
  let component: NuevoticketComponent;
  let fixture: ComponentFixture<NuevoticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
