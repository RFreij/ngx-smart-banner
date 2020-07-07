import { ViewContainerRef } from '@angular/core';

export interface NgxSmartBannerSettings {
    title?: string;
    author?: string;
    price?: string;
    priceSuffix?: {
        ios?: string;
        android?: string;
    };
    rating?: {
        ios?: number;
        android?: number;
    };
    icon?: {
        ios?: string;
        android?: string;
    };
    buttonLabel?: string;
    buttonUrl?: {
        ios?: string;
        android?: string;
    };
    closeLabel?: string;
    enabledPlatforms?: Array<NgxSmartBannerPlatform>;
    viewContainerRef: ViewContainerRef | null;
    daysHidden?: number | null;
    daysReminder?: number | null;
}

export enum NgxSmartBannerPlatform {
    Android = 'android',
    IOS = 'ios',
}
