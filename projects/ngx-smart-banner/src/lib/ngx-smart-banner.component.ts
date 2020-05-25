import { Platform } from '@angular/cdk/platform';
import { Component, ComponentRef, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartBannerSettings } from './settings.interface';

@Component({
    selector: 'nc-ngx-smart-banner',
    templateUrl: './ngx-smart-banner.component.html',
    styleUrls: ['./ngx-smart-banner.component.scss'],
})
export class NgxSmartBannerComponent {
    @Input() public settings: NgxSmartBannerSettings;
    @Input() public componentRef: ComponentRef<NgxSmartBannerComponent>;

    public modifier: string;

    constructor(
        private readonly platform: Platform,
        private readonly cookieService: CookieService,
    ) {
        if (this.platform.ANDROID) {
            this.modifier = 'android';
        }

        if (this.platform.IOS) {
            this.modifier = 'ios';
        }
    }

    /**
     * Gets icon
     */
    public get icon(): string | null {
        if (this.platform.ANDROID) {
            return this.settings?.icon?.android;
        }

        if (this.platform.IOS) {
            return this.settings?.icon?.ios;
        }

        return null;
    }

    /**
     * Gets button url
     */
    public get buttonUrl(): string {
        if (this.platform.ANDROID) {
            return this.settings?.buttonUrl?.android;
        }

        if (this.platform.IOS) {
            return this.settings?.buttonUrl?.ios;
        }

        return '#';
    }

    /**
     * Gets price suffix
     */
    public get priceSuffix(): string {
        if (this.platform.ANDROID) {
            return this.settings.priceSuffix.android;
        }

        if (this.platform.IOS) {
            return this.settings.priceSuffix.ios;
        }

        return '';
    }

    /**
     * Set cookie to reminder value and destroy component
     */
    public exit(): void {
        this.cookieService.set('smartbanner_closed', '1', this.endDate('exit'));
        this.componentRef.destroy();
    }

    /**
     * Set cookie to hidden value and destroy component
     *
     * @author Roy Freij <roy@bsbip.com>
     */
    public view(): void {
        this.cookieService.set('smartbanner_closed', '1', this.endDate('view'));
        this.componentRef.destroy();
    }

    /**
     * Gets end date
     */
    private endDate(type: string): Date | null {
        const date = new Date();

        if (!this.settings.daysReminder) {
            return null;
        }

        const timeToLive =
            type === 'exit'
                ? this.settings.daysHidden
                : this.settings.daysReminder;

        date.setDate(date.getDate() + timeToLive);

        return date;
    }
}
