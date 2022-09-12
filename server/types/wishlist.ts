import { Product } from "@framework/schema";

export type IWishlist = {
    _id: string;
    products: Product[];
    customerId?: string;
};
