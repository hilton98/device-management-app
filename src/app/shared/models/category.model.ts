import { Device } from "./device.model";

export interface Category {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    devices?: Device[]  
}