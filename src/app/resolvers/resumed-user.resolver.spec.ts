import { TestBed } from '@angular/core/testing';

import { ResumedUserResolver } from './resumed-user.resolver';

describe('ResumedUserResolver', () => {
  let resolver: ResumedUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResumedUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
