import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { Device } from "../../../shared/models/device.model";

@Injectable({
    providedIn: 'root'
})

export class GetDevicesService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(): Observable<Device[]> {
        return this.httpClientService.get<Device[]>('devices?relations=category')
    }
}