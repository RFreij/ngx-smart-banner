import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';
import {
    ComponentFactoryResolver,
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartBannerComponent } from './ngx-smart-banner.component';
import {
    NgxSmartBannerPlatform,
    NgxSmartBannerSettings,
} from './settings.interface';

@Injectable({
    providedIn: 'root',
})
export class NgxSmartBannerService {
    private readonly isServer: boolean;

    private settings: NgxSmartBannerSettings;
    private smartBanner: NgxSmartBannerComponent = null;

    constructor(
        private readonly platform: Platform,
        private readonly componentResolver: ComponentFactoryResolver,
        @Inject(PLATFORM_ID) private readonly platformId: string,
        private readonly cookieService: CookieService,
    ) {
        this.isServer = isPlatformServer(this.platformId);

        console.log(
            platform.ANDROID,
            platform.IOS,
            platform.isBrowser,
            platform.BLINK,
        );

        this.settings = {
            title: 'Smart application',
            author: 'Smartbanner contributors',
            price: 'FREE',
            closeLabel: 'Close',
            buttonLabel: 'VIEW',
            enabledPlatforms: [
                NgxSmartBannerPlatform.Android,
                NgxSmartBannerPlatform.IOS,
            ],
            viewContainerRef: null,
            priceSuffix: {
                ios: ' - On the App Store',
                android: ' - In Google play',
            },
        };
    }

    /**
     * Initializes ngx smart banner service
     *
     * @params settings
     */
    public initialize(settings: NgxSmartBannerSettings): void {
        if (this.isServer || this.cookieService.check('smartbanner_closed')) {
            return;
        }

        if (!this.platformEnabled) {
            return;
        }

        this.settings = { ...this.settings, ...settings };

        if (!this.settings.viewContainerRef) {
            throw new Error('No view container ref provided');
        }

        if (this.smartBanner === null) {
            const componentFactory = this.componentResolver.resolveComponentFactory(
                NgxSmartBannerComponent,
            );
            const componentRef = this.settings.viewContainerRef.createComponent(
                componentFactory,
            );

            componentRef.instance.componentRef = componentRef;

            this.smartBanner = componentRef.instance;
        }

        this.smartBanner.settings = this.settings;
    }

    /**
     * Determine if platform is enabled
     */
    private get platformEnabled(): boolean {
        if (this.platform.ANDROID) {
            return this.settings.enabledPlatforms.includes(
                NgxSmartBannerPlatform.Android,
            );
        }

        if (this.platform.IOS) {
            return this.settings.enabledPlatforms.includes(
                NgxSmartBannerPlatform.IOS,
            );
        }

        return false;
    }
}
