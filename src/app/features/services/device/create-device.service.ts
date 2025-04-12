import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { CreateDevice } from "../../../shared/models/device.model";

@Injectable({
    providedIn: 'root'
})

export class CreateDeviceService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(data: CreateDevice): Observable<CreateDevice> {
        return this.httpClientService.post<CreateDevice>('devices', data);
    }
}