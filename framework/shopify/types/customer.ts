import {
    Checkout,
    MailingAddress,
    MailingAddressConnection,
} from "@framework/schema";

export interface Customer {
    id: string;
    email: string;
    firstName: string;
    phone: string;
    acceptsMarketing?: boolean;
    lastName?: string;
    addresses?: MailingAddressConnection;
    defaultAddress?: MailingAddress;
    password?: string;
    lastIncompleteCheckout: Checkout | null;
}

export interface CustomerError {
    code: string;
    field: string[];
    message: string;
}
