import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { Device } from "../../../shared/models/device.model";

@Injectable({
    providedIn: 'root'
})

export class DeleteDeviceService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(deviceId: number): Observable<Device> {
        const params = `devices/${deviceId}`
        return this.httpClientService.delete<Device>(params);
    }
}