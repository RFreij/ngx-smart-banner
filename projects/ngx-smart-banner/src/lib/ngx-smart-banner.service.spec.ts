import { Platform } from '@angular/cdk/platform';
import { Component, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartBannerComponent } from '../public_api';
import { PlatformMockIOS } from '../testing/patform-mock-ios';
import { NgxSmartBannerService } from './ngx-smart-banner.service';
import { NgxSmartBannerPlatform } from './settings.interface';

@Component({
    template: `<div></div>`,
})
export class MockComponent {
    constructor(
        public ngxSmartBannerService: NgxSmartBannerService,
        public viewContainerRef: ViewContainerRef,
    ) {}
}

const defaultSettings = {
    icon: {
        ios:
            'https://www.apple.com/v/ios/app-store/d/images/overview/app_store_icon__fngcxe43zo2u_large.jpg',
    },
    buttonUrl: {
        ios: 'https://www.apple.com/nl/ios/app-store/',
    },
    daysHidden: 15,
    daysReminder: 90,
};

describe('NgxSmartBannerService', () => {
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>;
    let service: NgxSmartBannerService;
    let cookieService: CookieService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxSmartBannerComponent],
            providers: [
                {
                    provide: Platform,
                    useClass: PlatformMockIOS,
                },
            ],
        }).compileComponents();

        service = TestBed.inject(NgxSmartBannerService);
        cookieService = TestBed.inject(CookieService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MockComponent);
        component = fixture.componentInstance;

        component.ngxSmartBannerService = service;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('platformEnabled should return false when not enabled', () => {
        service.initialize({
            ...defaultSettings,
            ...{
                viewContainerRef: component.viewContainerRef,
                enabledPlatforms: [],
            },
        });

        expect((service as any).platformEnabled).toBeFalsy();
    });

    it('should throw an error when view container ref is not provided', () => {
        expect(() => {
            service.initialize({
                ...defaultSettings,
                ...{
                    viewContainerRef: null,
                    enabledPlatforms: [NgxSmartBannerPlatform.IOS],
                },
            });
        }).toThrowError('No view container ref provided');
    });

    it('should create the NgxSmartBanner component', () => {
        service.initialize({
            ...defaultSettings,
            ...{
                viewContainerRef: component.viewContainerRef,
            },
        });

        fixture.detectChanges();

        expect(
            fixture.debugElement.query(By.directive(NgxSmartBannerComponent)),
        ).toBeTruthy();
    });

    it('should do nothing when cookie smartbanner_closed is set', () => {
        cookieService.set('smartbanner_closed', '1');

        service.initialize({
            ...defaultSettings,
            ...{
                viewContainerRef: component.viewContainerRef,
            },
        });

        fixture.detectChanges();

        expect(
            fixture.debugElement.query(By.directive(NgxSmartBannerComponent)),
        ).toBeNull();
    });

    it('should do nothing when platform is not enabled', () => {
        service.initialize({
            ...defaultSettings,
            ...{
                viewContainerRef: component.viewContainerRef,
                enabledPlatforms: [NgxSmartBannerPlatform.Android],
            },
        });

        fixture.detectChanges();

        expect(
            fixture.debugElement.query(By.directive(NgxSmartBannerComponent)),
        ).toBeNull();
    });

    afterEach(() => {
        cookieService.deleteAll();
    });
});
