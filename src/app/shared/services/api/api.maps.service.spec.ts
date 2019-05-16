import { TestBed } from '@angular/core/testing';

import { ApiMapsService } from './api.maps.service';

describe('ApiMapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMapsService = TestBed.get(ApiMapsService);
    expect(service).toBeTruthy();
  });
});
