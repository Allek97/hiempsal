import { Product } from "@framework/schema";

export type IViewed = {
    products: Product[];
    customerId?: string;
    _id: string;
};
