import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherCardComponent } from '@client/app/components/publishers-container/publisher-card/publisher-card.component';
import { BackEndError, Publisher } from '@client/app/types';
import { HttpService } from '@client/app/http.service';

@Component({
    selector: 'app-publishers-container',
    standalone: true,
    imports: [PublisherCardComponent, CommonModule],
    templateUrl: './publishers-container.component.html',
    styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
    constructor(private httpService: HttpService) {}

    publishers: Array<Publisher> = [];

    ngOnInit(): void {
        this.httpService.getPublishers().subscribe({
            next: (publishers: Publisher[]) => {
                this.publishers = publishers;
            },
            error: (error) => {
                console.error(error);
                alert('Failed to get publishers. Please try again later.');
            },
        });
    }

    addPublisher() {
        const nameOfNewPublisher = prompt('Enter the name of the new publisher');

        if (this._validatePublisherName(nameOfNewPublisher)) {
            this.httpService.addPublisher(nameOfNewPublisher).subscribe({
                next: (newlyAddedPublisher: Publisher) => {
                    this.publishers.unshift(newlyAddedPublisher);
                },
                error: ({ error: { errorMessage } }: BackEndError) => {
                    alert(errorMessage);
                },
            });
        } else {
            alert('Invalid publisher name (must not be empty or contain only whitespace)!');
        }
    }

    private _validatePublisherName(publisherName: string | null): publisherName is string {
        return typeof publisherName === 'string' && publisherName.trim().length > 0;
    }
}
