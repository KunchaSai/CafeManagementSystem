import { TestBed } from '@angular/core/testing';

import { AddToCartServiceService } from './add-to-cart-service.service';

describe('AddToCartServiceService', () => {
  let service: AddToCartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToCartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
