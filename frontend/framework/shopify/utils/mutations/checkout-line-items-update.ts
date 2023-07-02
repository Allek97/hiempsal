import { checkoutDetailFragment } from "../common";

const checkoutLineItemsUpdateMutation = `
    mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
        checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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

export default checkoutLineItemsUpdateMutation;
