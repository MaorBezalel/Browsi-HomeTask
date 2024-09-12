import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainCardComponent } from '@client/app/components/publishers-container/domain-card/domain-card.component';
import { Publisher } from '@client/app/types';

@Component({
    selector: 'app-publisher-card',
    standalone: true,
    imports: [DomainCardComponent, CommonModule],
    templateUrl: './publisher-card.component.html',
    styleUrl: './publisher-card.component.css',
})
export class PublisherCardComponent {
    @Input() publisher!: Publisher;

    constructor() {}
}
