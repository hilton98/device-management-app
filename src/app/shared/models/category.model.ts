import { Device } from "./device.model";

export interface Category {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    devices?: Device[]  
}

export interface CategoryList {
    categories: Category[],
    total: number
}

export interface CreateCategory {
    id?: number,
    name: string,  
}