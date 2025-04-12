import { Category } from "./category.model";

export interface Device {
    id: number,
    categoryId: number,
    color: string,
    partNumber: number,
    createdAt: Date,
    updatedAt: Date,
    category?: Category;
}

export interface CreateDevice {
    id?: number,
    categoryId?: number,
    categoryName?: string,
    color: string,
    partNumber: number,
}