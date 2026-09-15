import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postform } from './postform';

describe('Postform', () => {
  let component: Postform;
  let fixture: ComponentFixture<Postform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Postform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
