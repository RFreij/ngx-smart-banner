# NgxSmartBanner

Angular service for the imlementation of a smart banner to notify your users about your available app. 

This package is inspired by [smartbannerjs](https://github.com/ain/smartbanner.js) and [smart-app-banner](https://github.com/kudago/smart-app-banner)

## Usage

Add the package as a dependency to your project using:

```bash
npm install @netcreaties/ngx-smart-banner
```

```bash
yarn add @netcreaties/ngx-smart-banner
```

Add the module to your app.module imports:
```typescript
import { NgxSmartBannerModule } from '@netcreaties/ngx-smart-banner';
...

@NgModule({
    imports: [NgxSmartBannerModule],
    ...
})
```

Import the service in your app.component and initialize with settings

```typescript
import { NgxSmartBannerService } from '@netcreaties/ngx-smart-banner';


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
```

### Configuration options

The following configuration options are available
Option                              | Default               | Description
---                                 | ---                   | ---
title                               | Smart application     | Name of your application
author                              | Smartbanner author    | The company name, for example
price                               | FREE                  | Price in string
priceSuffix.ios                     |  - On the App Store   | Suffix that should be added after price
priceSuffix.andorid                 |  - In Google Play     | Suffix that should be added after price
icon.ios                            |                       | Icon url for IOS devices, can be relative or absolute
icon.android                        |                       | Icon url for android devices, can be relative or absolute
closeLabel                          | Close                 | Label for close button
buttonLabel                         | VIEW                  | Label for the view button
buttonUrl.ios                       |                       | Url to store location ex. https://ios/application-url
buttonUrl.android                   |                       | Url to google play ex. https://android/application-url
enabledPlatforms                    | ['Android', 'IOS']    | Platforms to be enabled
viewContainerRef (**Required**)     | NULL                  | View container ref the service uses to create the component in
daysHidden                          | NULL                  | Days to hide the smart banner after pressing exit button, null for indefinitely
daysReminder                        | NULL                  | Days to hide the smart banner after pressing the view button, null for indefinitely


### TODO
* Create demo
* Add events?
