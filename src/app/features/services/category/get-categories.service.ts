import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { CategoryList } from "../../../shared/models/category.model";
import { CategoryQueryParams } from "../../interfaces/category-query-params.interface";

@Injectable({
    providedIn: 'root'
})

export class GetCategoriesService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(queryParams?: CategoryQueryParams): Observable<CategoryList> {
        const params = this.buildCategoryParams(queryParams)
        return this.httpClientService.get<CategoryList>(`categories${params}`)
    }

    private buildCategoryParams(filters?: CategoryQueryParams) {
        let params = '?relations=devices'

        if (filters?.page && filters?.itemsPerPage) {
            params = `${params}&page=${filters?.page}&itemsPerPage=${filters.itemsPerPage}`;
        }    
        return params;
    }
}