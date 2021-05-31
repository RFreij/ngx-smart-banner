import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class CookieService {
    public isBrowser: boolean;

    public constructor(
        @Inject(PLATFORM_ID) platformId: InjectionToken<object>,
        @Inject(DOCUMENT) private readonly document: any,
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    public check(key: string): boolean {
        if (!this.isBrowser) {
            return false;
        }

        return this.isBrowser && this.document.cookie.includes(key);
    }

    public set(key: string, value: string, until: Date | null = null): void {
        if (!this.isBrowser) {
            return;
        }

        const untilUTC = until?.toUTCString();
        const expires = untilUTC ? `; expires=${until?.toUTCString() || ''}` : '';
        this.document.cookie = `${key}=${value}${expires}; path=/; SameSite=Strict`;
    }

    public get(key: string): string | null {
        if (!this.isBrowser) {
            return '';
        }

        const match = this.document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
        return match?.[2] || null;
    }

    public deleteAll(): void {
        if (!this.isBrowser) {
            return;
        }

        this.document.cookie = '';
    }
}
