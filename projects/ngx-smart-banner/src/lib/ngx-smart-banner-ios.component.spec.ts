import { Platform } from '@angular/cdk/platform';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlatformMockIOS } from '../testing/patform-mock-ios';
import { NgxSmartBannerComponent } from './ngx-smart-banner.component';
import { NgxSmartBannerService } from './ngx-smart-banner.service';
import { CookieService } from './utils/cookie-service';

describe('NgxSmartBannerComponent IOS', () => {
    let component: NgxSmartBannerComponent;
    let fixture: ComponentFixture<NgxSmartBannerComponent>;

    let ngxSmartBannerService: NgxSmartBannerService;
    let cookieService: CookieService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxSmartBannerComponent],
            providers: [
                {
                    provide: Platform,
                    useClass: PlatformMockIOS,
                },
            ],
        }).compileComponents();

        ngxSmartBannerService = TestBed.inject(NgxSmartBannerService);
        cookieService = TestBed.inject(CookieService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxSmartBannerComponent);
        component = fixture.componentInstance;

        component.settings = {
            ...ngxSmartBannerService.settings,
            ...{
                icon: {
                    ios:
                        'https://www.apple.com/v/ios/app-store/d/images/overview/app_store_icon__fngcxe43zo2u_large.jpg',
                },
                buttonUrl: {
                    ios: 'https://www.apple.com/nl/ios/app-store/',
                },
            },
        };
        component.componentRef = fixture.componentRef;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have android modifier', () => {
        const debugElement = fixture.debugElement;

        expect(
            debugElement.query(By.css('div')).classes['smartbanner--ios'],
        ).toBeTrue();
    });

    it('should return correct icon', () => {
        expect(component.icon).toEqual(
            'https://www.apple.com/v/ios/app-store/d/images/overview/app_store_icon__fngcxe43zo2u_large.jpg',
        );
    });

    it('should return correct button URL', () => {
        expect(component.buttonUrl).toEqual(
            'https://www.apple.com/nl/ios/app-store/',
        );
    });

    it('should return correct price suffix', () => {
        expect(component.priceSuffix).toEqual(' - On the App Store');
    });

    it('should set cookie on exit', () => {
        const spyEndDate = spyOn(component as any, 'endDate').and.callThrough();

        component.exit();
        fixture.detectChanges();

        expect(spyEndDate).toHaveBeenCalled();
        expect(cookieService.get('smartbanner_closed')).toEqual('1');
    });

    it('should set cookie on view', () => {
        const spyEndDate = spyOn(component as any, 'endDate').and.callThrough();

        component.view();
        fixture.detectChanges();

        expect(spyEndDate).toHaveBeenCalled();
        expect(cookieService.get('smartbanner_closed')).toEqual('1');
    });

    afterEach(() => {
        cookieService.deleteAll();
    });
});
