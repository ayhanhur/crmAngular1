import { TestBed, inject } from '@angular/core/testing';

import { I18LangService } from './i18-lang.service';

describe('I18LangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18LangService]
    });
  });

  it('should be created', inject([I18LangService], (service: I18LangService) => {
    expect(service).toBeTruthy();
  }));
});
