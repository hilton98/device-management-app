import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { DeviceList } from "../../../shared/models/device.model";
import { DeviceQueryParams } from "../../interfaces/device-query-params.interface";

@Injectable({
    providedIn: 'root'
})

export class GetDevicesService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(queryParams?: DeviceQueryParams): Observable<DeviceList> {
        const params = this.buildDeviceParams(queryParams)
        return this.httpClientService.get<DeviceList>(`devices${params}`)
    }

    private buildDeviceParams(filters?: DeviceQueryParams) {
        let params = '?relations=category'

        if (filters?.page && filters?.itemsPerPage) {
            params = `${params}&page=${filters?.page}&itemsPerPage=${filters.itemsPerPage}`;
        }    
        return params;
    }
      
      
}