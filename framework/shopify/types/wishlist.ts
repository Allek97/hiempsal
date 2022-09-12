import { Product } from "./product";

export type Wishlist = {
    _id: string;
    products: Product[];
    customerId?: string;
};
