import { TestBed } from '@angular/core/testing';

import { GitHubService } from './git-hub.service';

describe('ApiService', () => {
  let service: GitHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
