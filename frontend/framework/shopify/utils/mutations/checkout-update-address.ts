import { checkoutDetailFragment } from "../common";

const checkoutUpdateAddressMutation = `
mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
    checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      checkout {
        ${checkoutDetailFragment}
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`;

export default checkoutUpdateAddressMutation;
