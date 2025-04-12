import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { Category } from "../../../shared/models/category.model";

@Injectable({
    providedIn: 'root'
})

export class GetCategoryByIdService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(): Observable<Category> {
        return this.httpClientService.get<Category>('categories');
    }
}