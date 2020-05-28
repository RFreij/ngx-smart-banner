import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable()
export class PlatformMockIOS extends Platform {
    ANDROID = false;
    IOS = true;
}
