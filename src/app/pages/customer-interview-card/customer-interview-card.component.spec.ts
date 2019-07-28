import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInterviewCardComponent } from './customer-interview-card.component';

describe('CustomerInterviewCardComponent', () => {
  let component: CustomerInterviewCardComponent;
  let fixture: ComponentFixture<CustomerInterviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInterviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInterviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
