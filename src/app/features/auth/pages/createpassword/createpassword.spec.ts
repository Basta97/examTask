import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createpassword } from './createpassword';

describe('Createpassword', () => {
  let component: Createpassword;
  let fixture: ComponentFixture<Createpassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createpassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createpassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
