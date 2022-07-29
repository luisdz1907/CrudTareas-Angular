import { TestBed } from '@angular/core/testing';

import { ActividadesServiceService } from './actividades.service';

describe('ActividadesServiceService', () => {
  let service: ActividadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
