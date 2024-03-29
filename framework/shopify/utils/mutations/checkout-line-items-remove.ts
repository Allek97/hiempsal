import { checkoutDetailFragment } from "../common";

const checkoutLineItemsAddMutation = `
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
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

export default checkoutLineItemsAddMutation;
