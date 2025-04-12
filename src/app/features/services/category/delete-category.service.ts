import { Injectable } from "@angular/core";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { Category } from "../../../shared/models/category.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DeleteCategoryService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(deviceId: number): Observable<Category> {
        const params = `categories/${deviceId}`
        return this.httpClientService.delete<Category>(params);
    }
}