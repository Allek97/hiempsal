import { Checkout } from "@framework/schema";
import { Address } from "./address";
import { Maybe } from "./commun";
import { Order } from "./order";

export interface Customer {
    id: string;
    email: Maybe<string>;
    firstName: Maybe<string>;
    lastName: Maybe<string>;
    displayName: string;
    phone: Maybe<string>;
    acceptsMarketing: boolean;
    orders: Order[];
    addresses: Address[];
    defaultAddress: Maybe<Address>;
    lastIncompleteCheckout: Maybe<Checkout>;
    updatedAt: string | null;
    createdAt: string | null;
}

export interface CustomerError {
    code: string;
    field: string[];
    message: string;
}
