import { TestBed } from '@angular/core/testing';

import { UserGroupResolver } from './user-group.resolver';

describe('UserGroupResolver', () => {
  let resolver: UserGroupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserGroupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
