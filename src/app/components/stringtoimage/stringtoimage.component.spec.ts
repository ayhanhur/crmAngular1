import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringtoimageComponent } from './stringtoimage.component';

describe('StringtoimageComponent', () => {
  let component: StringtoimageComponent;
  let fixture: ComponentFixture<StringtoimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringtoimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringtoimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
