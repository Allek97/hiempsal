import { Customer } from "@framework/schema";
import { Customer as ShopifyCustomer } from "@framework/types/customer";

export const normalizeCustomer = (customer: Customer): ShopifyCustomer => {
    const { id, email, firstName, phone, lastIncompleteCheckout } = customer;
    return {
        id: id,
        email: email ?? "",
        firstName: firstName ?? "",
        phone: phone ?? "",
        lastIncompleteCheckout: lastIncompleteCheckout ?? null,
    };
};
