import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmartBannerComponent } from './ngx-smart-banner.component';
import { StarComponent } from './star/star.component';

@NgModule({
    declarations: [NgxSmartBannerComponent, StarComponent],
    imports: [CommonModule, PlatformModule],
    exports: [NgxSmartBannerComponent],
})
export class NgxSmartBannerModule {}
