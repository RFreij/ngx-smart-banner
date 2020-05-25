import { TestBed } from '@angular/core/testing';

import { NgxSmartBannerService } from './ngx-smart-banner.service';

describe('NgxSmartBannerService', () => {
  let service: NgxSmartBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSmartBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
