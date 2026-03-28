import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmail } from './register-email';

describe('RegisterEmail', () => {
  let component: RegisterEmail;
  let fixture: ComponentFixture<RegisterEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
