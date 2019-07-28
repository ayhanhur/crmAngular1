import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadpageComponent } from './leadpage.component';

describe('LeadpageComponent', () => {
  let component: LeadpageComponent;
  let fixture: ComponentFixture<LeadpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
