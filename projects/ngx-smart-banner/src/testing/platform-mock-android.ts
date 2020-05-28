import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable()
export class PlatformMockAndroid extends Platform {
    ANDROID = true;
    IOS = false;
}
