import { TestBed } from '@angular/core/testing';

import { NgxAutocompleteApiService } from './ngx-autocomplete-api.service';

describe('NgxAutocompleteApiService', () => {
  let service: NgxAutocompleteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAutocompleteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
