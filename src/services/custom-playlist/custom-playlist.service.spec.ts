import { TestBed } from '@angular/core/testing';

import { CustomPlaylistService } from './custom-playlist.service';

describe('CustomPlaylistService', () => {
  let service: CustomPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
