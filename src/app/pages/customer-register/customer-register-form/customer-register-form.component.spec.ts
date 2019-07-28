import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegisterFormComponent } from './customer-register-form.component';

describe('CustomerRegisterFormComponent', () => {
  let component: CustomerRegisterFormComponent;
  let fixture: ComponentFixture<CustomerRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
