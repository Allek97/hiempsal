import { Product } from "./product";

export type Wishlist = {
    _id: string;
    products: Product[];
    customerId?: string;
};
export type WishlistServer = {
    _id: string;
    products: string[];
    customerId?: string;
};
