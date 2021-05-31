import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';
import {
    ComponentFactoryResolver,
    EventEmitter,
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSmartBannerComponent } from './ngx-smart-banner.component';
import {
    NgxSmartBannerPlatform,
    NgxSmartBannerSettings,
} from './settings.interface';
import { CookieService } from './utils/cookie-service';

@Injectable({
    providedIn: 'root',
})
export class NgxSmartBannerService {
    private readonly isServer: boolean;

    public settings: NgxSmartBannerSettings;
    private smartBanner: NgxSmartBannerComponent | null = null;

    public onOpen: EventEmitter<void>;
    public onClose: EventEmitter<void>;

    private onCloseSubscription$!: Subscription;

    constructor(
        private readonly platform: Platform,
        private readonly componentResolver: ComponentFactoryResolver,
        @Inject(PLATFORM_ID) private readonly platformId: string,
        private readonly cookieService: CookieService,
    ) {
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();

        this.isServer = isPlatformServer(this.platformId);

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
            rating: {
                ios: 2,
                android: 5,
            },
            hideRating: false,
        };
    }

    /**
     * Initializes ngx smart banner service
     *
     * @params settings
     */
    public initialize(settings: NgxSmartBannerSettings): void {
        this.settings = { ...this.settings, ...settings };

        if (!this.settings.viewContainerRef) {
            throw new Error('No view container ref provided');
        }

        if (this.isServer || this.cookieService.check('smartbanner_closed')) {
            return;
        }

        if (!this.platformEnabled) {
            return;
        }

        if (this.smartBanner === null) {
            const componentFactory = this.componentResolver.resolveComponentFactory(
                NgxSmartBannerComponent,
            );
            const componentRef = this.settings.viewContainerRef.createComponent(
                componentFactory,
            );

            this.onOpen.emit();
            componentRef.instance.componentRef = componentRef;

            this.smartBanner = componentRef.instance;

            this.onCloseSubscription$ = this.smartBanner.onClose.subscribe(
                () => {
                    this.onClose.emit();

                    this.onCloseSubscription$.unsubscribe();
                },
            );
        }

        this.smartBanner.settings = this.settings;
    }

    /**
     * Determine if platform is enabled
     */
    private get platformEnabled(): boolean {
        if (this.platform.ANDROID) {
            return !!this.settings.enabledPlatforms?.includes(
                NgxSmartBannerPlatform.Android,
            );
        }

        if (this.platform.IOS) {
            return !!this.settings.enabledPlatforms?.includes(
                NgxSmartBannerPlatform.IOS,
            );
        }

        return false;
    }
}
