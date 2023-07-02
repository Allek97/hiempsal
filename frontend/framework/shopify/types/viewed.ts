import { Product } from "./product";

export type Viewed = {
    _id: string;
    products: Product[];
    customerId?: string;
};
