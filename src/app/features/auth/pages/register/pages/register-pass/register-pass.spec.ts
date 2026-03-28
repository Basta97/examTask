import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPass } from './register-pass';

describe('RegisterPass', () => {
  let component: RegisterPass;
  let fixture: ComponentFixture<RegisterPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
