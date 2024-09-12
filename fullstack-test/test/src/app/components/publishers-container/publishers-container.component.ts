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
        this._fetchPublishers();
    }

    addPublisher() {
        const nameOfNewPublisher = prompt('Enter the name of the new publisher');
        if (this._validatePublisherName(nameOfNewPublisher)) {
            this._handleAddPublisher(nameOfNewPublisher);
        } else {
            alert('Invalid publisher name (must not be empty or contain only whitespace)!');
        }
    }

    deletePublisher(publisherName: string) {
        this.httpService.deleteOnePublisher(publisherName).subscribe({
            next: () => {
                this.publishers = this.publishers.filter((publisher) => publisher.publisher !== publisherName);
            },
            error: ({ error: { errorMessage } }: BackEndError) => {
                alert(errorMessage);
            },
        });
    }

    private _fetchPublishers(): void {
        this.httpService.getPublishers().subscribe({
            next: (publishers: Publisher[]) => {
                this.publishers = publishers;
            },
            error: (error) => {
                this._handleError(error, 'Failed to get publishers. Please try again later.');
            },
        });
    }

    private _handleAddPublisher(nameOfNewPublisher: string): void {
        this.httpService.addPublisher(nameOfNewPublisher).subscribe({
            next: (newlyAddedPublisher: Publisher) => {
                this.publishers.unshift(newlyAddedPublisher);
            },
            error: ({ error: { errorMessage } }: BackEndError) => {
                alert(errorMessage);
            },
        });
    }

    private _handleError(error: any, message: string): void {
        console.error(error);
        alert(message);
    }

    private _validatePublisherName(publisherName: string | null): publisherName is string {
        return typeof publisherName === 'string' && publisherName.trim().length > 0;
    }
}
