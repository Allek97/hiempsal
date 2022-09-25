const checkoutUpdateAddressMutation = `
mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
    checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`;

export default checkoutUpdateAddressMutation;
