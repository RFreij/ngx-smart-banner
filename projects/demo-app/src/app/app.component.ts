import { Component, ViewContainerRef } from '@angular/core';
import { NgxSmartBannerService } from 'projects/ngx-smart-banner/src/public_api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'demo-app';

    constructor(
        private readonly ngxSmartBannerService: NgxSmartBannerService,
        private readonly viewContainerRef: ViewContainerRef,
    ) {
        this.ngxSmartBannerService.onClose.subscribe(() => {
            console.log('close');
        });

        this.ngxSmartBannerService.onOpen.subscribe(() => {
            console.log('open');
        });

        this.ngxSmartBannerService.initialize({
            viewContainerRef: this.viewContainerRef,
            icon: {
                ios:
                    'https://www.apple.com/v/ios/app-store/d/images/overview/app_store_icon__fngcxe43zo2u_large.jpg',
                android:
                    'https://b1.pngbarn.com/png/551/207/google-play-icon-logo-1024-google-playstore-icon-png-clip-art.png',
            },
            buttonUrl: {
                ios: 'https://www.apple.com/nl/ios/app-store/',
                android: 'https://play.google.com/store',
            },
            daysHidden: 15,
            daysReminder: 90,
        });
    }
}
