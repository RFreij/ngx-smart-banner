import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['../ngx-smart-banner.component.scss'],
})
export class StarComponent {
    @Input() public solid: any;
}
