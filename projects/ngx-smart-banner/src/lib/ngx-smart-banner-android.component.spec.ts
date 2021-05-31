import { Platform } from '@angular/cdk/platform';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlatformMockAndroid } from '../testing/platform-mock-android';
import { NgxSmartBannerComponent } from './ngx-smart-banner.component';
import { NgxSmartBannerService } from './ngx-smart-banner.service';
import { CookieService } from './utils/cookie-service';

describe('NgxSmartBannerComponent Android', () => {
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
                    useClass: PlatformMockAndroid,
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
                    android:
                        'https://b1.pngbarn.com/png/551/207/google-play-icon-logo-1024-google-playstore-icon-png-clip-art.png',
                },
                buttonUrl: {
                    android: 'https://play.google.com/store',
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
            debugElement.query(By.css('div')).classes['smartbanner--android'],
        ).toBeTrue();
    });

    it('should return correct icon', () => {
        expect(component.icon).toEqual(
            'https://b1.pngbarn.com/png/551/207/google-play-icon-logo-1024-google-playstore-icon-png-clip-art.png',
        );
    });

    it('should return correct button URL', () => {
        expect(component.buttonUrl).toEqual('https://play.google.com/store');
    });

    it('should return correct price suffix', () => {
        expect(component.priceSuffix).toEqual(' - In Google play');
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
