import { TestBed, inject } from '@angular/core/testing';

import { JunocrmService } from './junocrm.service';

describe('JunocrmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JunocrmService]
    });
  });

  it('should be created', inject([JunocrmService], (service: JunocrmService) => {
    expect(service).toBeTruthy();
  }));
});
