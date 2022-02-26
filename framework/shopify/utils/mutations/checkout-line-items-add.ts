import { checkoutDetailFragment } from "../common";

const checkoutLineItemsAdd = `
    mutation($checkoutId: ID!,$lineItems: [checkoutLineItemInput!]!) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            checkoutUserErrors {
                field
                message
            }
            checkout {
                ${checkoutDetailFragment}
            }
        }
    }

`;

export default checkoutLineItemsAdd;
