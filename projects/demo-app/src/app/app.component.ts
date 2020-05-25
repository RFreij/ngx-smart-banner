import { Component, ViewContainerRef } from '@angular/core';
import { NgxSmartBannerService } from 'projects/ngx-smart-banner/src/lib/ngx-smart-banner.service';

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
        this.ngxSmartBannerService.initialize({
            viewContainerRef: this.viewContainerRef,

            daysHidden: 15,
            daysReminder: 90,
        });
    }
}
