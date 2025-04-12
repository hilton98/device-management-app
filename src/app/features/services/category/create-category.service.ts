import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { CreateCategory } from "../../../shared/models/category.model";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CreateCategoryService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(data: CreateCategory): Observable<HttpResponse<CreateCategory>> {
        return this.httpClientService.post<CreateCategory>('categories', data);
    }
}