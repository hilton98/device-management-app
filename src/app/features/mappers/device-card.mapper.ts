import { Injectable } from "@angular/core";
import { Device } from "../../shared/models/device.model";
import { DeviceCard } from "../interfaces/device-card.interface";

@Injectable({
    providedIn: 'root'
})
export class DeviceCardMapper {
    mapOne(device: Device): DeviceCard {
        return {
            ...device,
            categoryName: device.category 
                ? device.category.name 
                : ""
        }
    }

    mapMany(devices: Device[]): DeviceCard[] {
        return devices.map( device => {
            return this.mapOne(device)
        })
    }
}