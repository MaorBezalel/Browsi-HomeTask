import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domain, Publisher } from './types';
import { Observable } from 'rxjs';
import { API_QUERY } from './constants';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}

    getPublishers(): Observable<Publisher[]> {
        return this.http.get<Publisher[]>(API_QUERY.PUBLISHERS.GET.ALL());
    }
    getOnePublisher(publisherName: string): Observable<Domain[]> {
        return this.http.get<Domain[]>(API_QUERY.PUBLISHERS.GET.ONE(publisherName));
    }
    addPublisher(publisherName: string): Observable<Publisher> {
        return this.http.post<Publisher>(API_QUERY.PUBLISHERS.POST.ADD(), { publisher: publisherName });
    }
    deleteOnePublisher(publisherName: string): Observable<void> {
        return this.http.delete<void>(API_QUERY.PUBLISHERS.DELETE.ONE(publisherName));
    }

    getDomainsForPublisher(publisherName: string): Observable<Domain[]> {
        return this.http.get<Domain[]>(API_QUERY.DOMAINS(publisherName).GET.ALL(publisherName));
    }
}
