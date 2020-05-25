import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSmartBannerComponent } from './ngx-smart-banner.component';

describe('NgxSmartBannerComponent', () => {
  let component: NgxSmartBannerComponent;
  let fixture: ComponentFixture<NgxSmartBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSmartBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSmartBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
