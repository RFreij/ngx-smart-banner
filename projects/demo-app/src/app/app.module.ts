import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSmartBannerModule } from 'projects/ngx-smart-banner/src/lib/ngx-smart-banner.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxSmartBannerModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
