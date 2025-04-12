import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class HttpClientService {

    private baseUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    get<T>(parameters: string): Observable<T> {
        const url = `${this.baseUrl}/${parameters}`;
        return this.http.get<T>(url);
    }

    delete<T>(parameters: string): Observable<T> {
        const url = `${this.baseUrl}/${parameters}`;
        return this.http.delete<T>(url)
    }

    post<T>(resource: string, data: T): Observable<HttpResponse<T>> {
        const url = `${this.baseUrl}/${resource}`;
        return this.http.post<T>(url, data, { observe: 'response' });
    }
}