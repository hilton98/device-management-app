import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClientService } from "../../../shared/services/http-client.service";
import { CreateDevice } from "../../../shared/models/device.model";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CreateDeviceService {

    constructor(
        private httpClientService: HttpClientService
    ) {}

    execute(data: CreateDevice): Observable<HttpResponse<CreateDevice>> {
        return this.httpClientService.post<CreateDevice>('devices', data);
    }
}