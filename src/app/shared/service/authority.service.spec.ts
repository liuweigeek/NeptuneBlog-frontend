import { TestBed } from '@angular/core/testing';

import { AuthorityService } from './authority.service';

describe('AuthorityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorityService = TestBed.get(AuthorityService);
    expect(service).toBeTruthy();
  });
});
